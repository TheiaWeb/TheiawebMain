const fs = require('fs');
const path = require('path');

//========================HTML template worker=================//

function generateHTMLFile(data, outputPath) {
  fs.readFile('TemplateFolder/index.html', 'utf8', (err, template) => {
    if (err) {
      console.error('Error reading template:', err);
      return;
    }

    // Replace the placeholders with actual values
    let html = template
      .replace('{{pageTitle}}', data.pageTitle)
      .replace('{{projectTitle}}', data.projectTitle)
      .replace('{{projectDescription}}', data.projectDescription);

    // Generate the output file path
    const htmlFilename = 'index.html';
    const htmlOutputFile = path.join(outputPath, htmlFilename);

    // Write the generated HTML to the output file
    fs.writeFile(htmlOutputFile, html, 'utf8', (err) => {
      if (err) {
        console.error('Error writing HTML file:', err);
        return;
      }
      console.log(`HTML file generated successfully: ${htmlOutputFile}`);
    });
  });
}

//========================CSS template worker=================//

function generateCSSFile(outputPath) {
  // Read style.css from the template folder
  fs.readFile('TemplateFolder/style.css', 'utf8', (err, cssContent) => {
    if (err) {
      console.error('Error reading style.css:', err);
      return;
    }

    // Generate the output CSS file path and write the CSS content
    const cssFilename = 'style.css';
    const cssOutputFile = path.join(outputPath, cssFilename);
    fs.writeFile(cssOutputFile, cssContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing CSS file:', err);
        return;
      }
      console.log(`CSS file generated successfully: ${cssOutputFile}`);
    });
  });
}

//========================JS template worker=================//

function generateJSFile(outputPath) {
  // Read script.js from the template folder
  fs.readFile('TemplateFolder/script.js', 'utf8', (err, jsContent) => {
    if (err) {
      console.error('Error reading script.js:', err);
      return;
    }

    // Generate the output JS file path and write the JS content
    const jsFilename = 'script.js';
    const jsOutputFile = path.join(outputPath, jsFilename);
    fs.writeFile(jsOutputFile, jsContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JS file:', err);
        return;
      }
      console.log(`JavaScript file generated successfully: ${jsOutputFile}`);
    });
  });
}

//========================IMG Folder template worker=================//

function generateImageFiles(outputPath) {
  // Create the "img" folder in the output path if it doesn't exist
  const imgFolderPath = path.join(outputPath, 'img');
  fs.mkdirSync(imgFolderPath, { recursive: true });

  // Copy the image files from the template folder to the "img" folder
  const imgFiles = ['project1.png', 'project2.png', 'project3.png', 'about-image.jpg', 'contact-image.png'];
  imgFiles.forEach((imgFile) => {
    const imgSrc = path.join('TemplateFolder/img', imgFile);
    const imgDest = path.join(imgFolderPath, imgFile);
    fs.copyFile(imgSrc, imgDest, (err) => {
      if (err) {
        console.error(`Error copying image file ${imgFile}:`, err);
        return;
      }
      console.log(`Image file ${imgFile} copied successfully to ${imgDest}`);
    });
  });
}

//========================OutPut Folder worker=================//

function generateOutputFolder(data) {
  // Generate the output folder path based on the current date and time
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const folderName = `OutputFolder_${timestamp}`;
  const outputFolderPath = path.join(__dirname, folderName);
  fs.mkdirSync(outputFolderPath);

  // Generate HTML, CSS, JS, and image files in the output folder
  generateHTMLFile(data, outputFolderPath);
  generateCSSFile(outputFolderPath);
  generateJSFile(outputFolderPath);
  generateImageFiles(outputFolderPath);
}

//========================DATA Builder=================//

const data = {
  pageTitle: 'My Portfolio',
  projectTitle: 'Project 1',
  projectDescription: 'Description of Project 1',
};

generateOutputFolder(data);
