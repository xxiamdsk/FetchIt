import express from "express";
import bodyParser from "body-parser";
import scrape from "website-scraper";
import fs from "fs";
import archiver from "archiver";
import pdf from "html-pdf"; // Import html-pdf for PDF generation
import { fileURLToPath } from "url";
import path from "path";
import { exec } from "child_process";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files

// Create __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the ZIP file
app.get("/download-zip", (req, res) => {
  const zipFilePath = path.join(__dirname, req.query.filename);
  res.download(zipFilePath, (err) => {
    if (err) {
      console.log("Error while downloading the ZIP file:", err);
    }
  });
});

// Function to create ZIP
const createZip = (directory, output) => {
  return new Promise((resolve, reject) => {
    const outputZip = fs.createWriteStream(output);
    const archive = archiver("zip", { zlib: { level: 9 } });

    outputZip.on("close", () => resolve(output));
    archive.on("error", (err) => reject(err));

    archive.pipe(outputZip);
    archive.directory(directory, false); // Don't include the parent directory
    archive.finalize();
  });
};

// Function to create PDF
const createPDF = (directory, output) => {
  return new Promise((resolve, reject) => {
    const htmlFilePath = path.join(directory, "index.html"); // Make sure this file exists
    pdf
      .create(fs.readFileSync(htmlFilePath, "utf8"))
      .toFile(output, (err, res) => {
        if (err) reject(err);
        resolve(res.filename);
      });
  });
};

// Function to create DOCX using pandoc
const createDocx = (dir, output) => {
  return new Promise((resolve, reject) => {
    const htmlFilePath = path.join(dir, "index.html"); // Make sure this file exists
    const command = `pandoc ${htmlFilePath} -o ${output}`;
    exec(command, (err) => {
      if (err) reject(err);
      resolve(output);
    });
  });
};

// Helper function to extract the domain from the URL
const getDomainFromUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.hostname.replace("www.", ""); // Remove 'www.' if present
  } catch (error) {
    throw new Error("Invalid URL");
  }
};

// POST route to handle download requests
app.post("/download", async (req, res) => {
  const { url, format } = req.body; // Extract 'url' and 'format' from request body

  if (!url || !format) {
    return res.status(400).send("URL and format are required");
  }

  try {
    // Get domain name and use it as the directory name
    const domain = getDomainFromUrl(url);
    const directory = `./SiteSnap`; // Directory specific to the domain
    const outputFile = `./downloaded-website.${format}`;

    // Check if the directory exists and delete it if it does
    if (fs.existsSync(directory)) {
      fs.rmdirSync(directory, { recursive: true }); // Remove the folder recursively
      console.log(`Deleted existing folder: ${directory}`);
    }

    // Scrape the website
    await scrape({
      urls: [url],
      urlFilter: (scrapedUrl) => {
        const domainName = getDomainFromUrl(scrapedUrl);
        return domainName === domain; // Ensure only URLs from the same domain are included
      },
      recursive: true,
      maxDepth: 50,
      prettifyUrls: true,
      filenameGenerator: "bySiteStructure",
      directory: directory, // Save files to the domain-specific directory
    });

    // Generate the requested format (ZIP, PDF, Word)
    if (format === "zip") {
      await createZip(directory, outputFile);
    } else if (format === "pdf") {
      const dir = directory + "/" + domain;
      await createPDF(dir, outputFile);
    } else if (format === "word") {
      const dir = directory + "/" + domain;
      await createDocx(dir, outputFile);
    } else {
      return res.status(400).send("Unsupported format");
    }

    // Send the file to the client
    res.download(outputFile, (err) => {
      if (err) {
        res.status(500).send("Error in sending the file.");
      } else {
        // Optionally delete the files after download
        fs.unlinkSync(outputFile);
        fs.rmdirSync(directory, { recursive: true }); // Clean up the domain folder after download
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing the request.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
