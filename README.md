# FetchIt

**FetchIt** is a powerful and user-friendly web application that allows users to download entire websites in various formats such as ZIP, PDF, or Word (DOCX). Whether you're a researcher, developer, or someone who simply needs offline access to a website for backup purposes, FetchIt makes it easy to capture and archive publicly accessible websites with a few clicks.

## Features

- **Multiple Download Formats**: Fetch websites in ZIP, PDF, or Word (DOCX) format.
- **Full Website Download**: Capture all relevant pages, assets, images, CSS, and scripts from any website.
- **User-Friendly Interface**: Simple design that makes downloading websites easy for everyone.
- **Customizable Scraping Depth**: Control how deep the website scraper goes in fetching linked pages.
- **Fast & Efficient**: FetchIt works swiftly to process and package websites for offline use.
- **Cross-Platform Compatibility**: Works in all major browsers and operating systems.

## How It Works

1. **Enter the Website URL**: Type in the URL of the website you want to download.
2. **Choose the Format**: Select your preferred format: ZIP, PDF, or DOCX (Word).
3. **Proceed to Download**: Click the "Proceed" button, and FetchIt will begin downloading the website.
4. **Download Your File**: Once processed, you'll be able to download the entire website in your chosen format.

## Installation

To run FetchIt on your local machine, follow the steps below:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

If you plan to use the DOCX (Word) export functionality, make sure you have [Pandoc](https://pandoc.org/) installed on your machine.

### Steps

1. **Clone this repository**:
   ```bash
   git clone https://github.com/xxiamdsk/fetchit.git
   cd fetchit
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   node server.mjs
   ```

4. **Access the application** in your browser at:
   ```
   http://localhost:3000
   ```

## Usage

Once the server is running and the application is open in your browser:

1. Enter the URL of the website you wish to download.
2. Select the download format (ZIP, PDF, or DOCX).
3. Click the "Proceed" button to initiate the download process.
4. When processing is complete, the download button will appear for you to save the website locally.

## Example

- **Download Website**: You can download an entire website by entering a URL like `https://example.com`, selecting a format (e.g., ZIP), and clicking "Proceed."
  
- **View Offline**: Once the download is complete, open the ZIP file or other formats to browse the website offline.

## API Overview

FetchIt leverages several core Node.js libraries and third-party modules to accomplish website downloading and packaging:

- **Express.js**: Manages server-side logic and routes.
- **Website-Scraper**: Handles downloading the website, including recursive link following and asset fetching.
- **Archiver**: Compresses the downloaded website into a ZIP archive.
- **HTML-PDF**: Converts HTML pages into PDF format for offline use.
- **Pandoc**: For DOCX conversion (if installed).

## Requirements

- Node.js
- NPM (Node Package Manager)
- Pandoc (required for DOCX support)
- A modern web browser

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Website-Scraper**: Library for downloading websites
- **Archiver**: File compression library
- **HTML-PDF**: PDF generation from HTML content
- **Pandoc**: Universal document converter (used for DOCX files)

## Contribution

We welcome contributions! If you'd like to report an issue or contribute to the development of FetchIt, feel free to:

1. **Fork the repository**.
2. **Create a new branch**:
   ```bash
   git checkout -b feature-branch
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add a new feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-branch
   ```
5. **Open a Pull Request** and describe your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or suggestions, feel free to reach out or open an issue.

---

**FetchIt** – Making website downloading simple, efficient, and accessible for everyone!
