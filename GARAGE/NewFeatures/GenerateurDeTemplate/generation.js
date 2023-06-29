//#region ZIP download function
document.addEventListener('DOMContentLoaded', function() {
    const imageDropArea = document.getElementById('imageDropArea');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imageInput = document.getElementById('imageUpload');
  
    imageDropArea.addEventListener('dragenter', handleDragEnter);
    imageDropArea.addEventListener('dragover', handleDragOver);
    imageDropArea.addEventListener('dragleave', handleDragLeave);
    imageDropArea.addEventListener('drop', handleDrop);
    imageInput.addEventListener('change', handleInputChange);
  
    function handleDragEnter(event) {
      event.preventDefault();
      imageDropArea.classList.add('highlight');
    }
  
    function handleDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      imageDropArea.classList.add('highlight');
    }
  
    function handleDragLeave(event) {
      event.preventDefault();
      imageDropArea.classList.remove('highlight');
    }
  
    function handleDrop(event) {
      event.preventDefault();
      imageDropArea.classList.remove('highlight');
  
      const files = event.dataTransfer.files;
      previewImages(files);
    }
  
    function handleInputChange(event) {
      const files = event.target.files;
      previewImages(files);
    }
  
    function previewImages(files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = function(event) {
          const imageURL = event.target.result;
          const previewItem = createPreviewItem(imageURL, file.name);
          imagePreviewContainer.appendChild(previewItem);
        }
  
        reader.readAsDataURL(file);
      }
    }
  
    function createPreviewItem(imageURL, fileName) {
      const previewItem = document.createElement('div');
      previewItem.classList.add('preview-item');
  
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('preview-image-container');
  
      const img = document.createElement('img');
      img.src = imageURL;
      img.addEventListener('click', function(event) {
        openImageInFullScale(imageURL, fileName, previewItem);
      });
  
      const removeIcon = document.createElement('div');
      removeIcon.classList.add('remove-icon');
      removeIcon.innerHTML = '&#x2716;';
      removeIcon.addEventListener('click', function() {
        removePreviewItem(previewItem);
      });
  
      imgContainer.appendChild(img);
      previewItem.appendChild(imgContainer);
      previewItem.appendChild(removeIcon);
  
      return previewItem;
    }
  
    function removePreviewItem(previewItem) {
      previewItem.remove();
    }
  
    function openImageInFullScale(src, fileName, previewItem) {
      const modal = document.createElement('div');
      modal.classList.add('image-modal');
  
      const modalImage = document.createElement('img');
      modalImage.src = src;
      modalImage.classList.add('full-scale-image');
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('modal-button', 'remove-button');
      removeButton.addEventListener('click', function() {
        previewItem.remove();
        document.body.removeChild(modal);
      });
  
      const renameButton = document.createElement('button');
      renameButton.textContent = 'Rename';
      renameButton.classList.add('modal-button', 'rename-button');
      renameButton.addEventListener('click', function() {
        const newFileName = prompt('Enter a new name for the image:', fileName);
        if (newFileName) {
          const img = previewItem.querySelector('img');
          img.alt = newFileName;
        }
      });
  
      modal.appendChild(modalImage);
      modal.appendChild(removeButton);
      modal.appendChild(renameButton);
      document.body.appendChild(modal);
  
      modal.addEventListener('click', function(event) {
        if (event.target === modal) {
          document.body.removeChild(modal);
        }
      });
  
      // Get dominant color from the image
      getDominantColor(src)
        .then(function(color) {
          removeButton.style.backgroundColor = color;
          renameButton.style.backgroundColor = color;
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  
    function getDominantColor(imageURL) {
      return new Promise(function(resolve, reject) {
        const image = new Image();
        image.src = imageURL;
  
        image.addEventListener('load', function() {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const width = image.width;
          const height = image.height;
  
          canvas.width = width;
          canvas.height = height;
  
          context.drawImage(image, 0, 0, width, height);
  
          const imageData = context.getImageData(0, 0, width, height).data;
          const pixelCount = width * height;
  
          const colorCount = {};
          let dominantColor = null;
          let maxCount = 0;
  
          for (let i = 0; i < pixelCount; i++) {
            const offset = i * 4;
            const r = imageData[offset];
            const g = imageData[offset + 1];
            const b = imageData[offset + 2];
            const color = `rgb(${r},${g},${b})`;
  
            if (colorCount[color]) {
              colorCount[color]++;
            } else {
              colorCount[color] = 1;
            }
  
            if (colorCount[color] > maxCount) {
              maxCount = colorCount[color];
              dominantColor = color;
            }
          }
  
          if (dominantColor) {
            resolve(dominantColor);
          } else {
            reject('Failed to determine dominant color');
          }
        });
  
        image.addEventListener('error', function() {
          reject('Failed to load image');
        });
      });
    }
  });
//#endregion
//#region CreateAnOutputFolderLocally
// const fs = require('fs');
// const path = require('path');

// //========================HTML template worker=================//

// function generateHTMLFile(data, outputPath) {
//   fs.readFile('TemplateFolder/index.html', 'utf8', (err, template) => {
//     if (err) {
//       console.error('Error reading template:', err);
//       return;
//     }

//     // Replace the placeholders with actual values
//     let html = template
//       .replace('{{SiteWebTitle}}', data.pageTitle)
//       .replace('{{Home}}', data.MenuFirstItem)
//       .replace('{{About}}', data.MenuSecondItem)
//       .replace('{{Projects}}', data.MenuThirdItem)
//       .replace('{{Contact}}', data.MenuForthItem)
//       .replace('{{HeaderTitle}}', data.HeaderTitle)
//       .replace('{{AboutMe}}', data.AboutMe)
//       .replace('{{project1Title}}', data.project1Title)
//       .replace('{{project2Title}}', data.project2Title)
//       .replace('{{project3Title}}', data.project3Title)
//       .replace('{{project1Description}}', data.project1Description)
//       .replace('{{project2Description}}', data.project2Description)
//       .replace('{{project3Description}}', data.project3Description)
//       .replace('{{Contact}}', data.Contact)


//     // Generate the output file path
//     const htmlFilename = 'index.html';
//     const htmlOutputFile = path.join(outputPath, htmlFilename);

//     // Write the generated HTML to the output file
//     fs.writeFile(htmlOutputFile, html, 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing HTML file:', err);
//         return;
//       }
//       console.log(`HTML file generated successfully: ${htmlOutputFile}`);
//     });
//   });
// }

// //========================CSS template worker=================//

// function generateCSSFile(outputPath) {
//   // Read style.css from the template folder
//   fs.readFile('TemplateFolder/style.css', 'utf8', (err, cssContent) => {
//     if (err) {
//       console.error('Error reading style.css:', err);
//       return;
//     }

//     // Generate the output CSS file path and write the CSS content
//     const cssFilename = 'style.css';
//     const cssOutputFile = path.join(outputPath, cssFilename);
//     fs.writeFile(cssOutputFile, cssContent, 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing CSS file:', err);
//         return;
//       }
//       console.log(`CSS file generated successfully: ${cssOutputFile}`);
//     });
//   });
// }

// //========================JS template worker=================//

// function generateJSFile(outputPath) {
//   // Read script.js from the template folder
//   fs.readFile('TemplateFolder/script.js', 'utf8', (err, jsContent) => {
//     if (err) {
//       console.error('Error reading script.js:', err);
//       return;
//     }

//     // Generate the output JS file path and write the JS content
//     const jsFilename = 'script.js';
//     const jsOutputFile = path.join(outputPath, jsFilename);
//     fs.writeFile(jsOutputFile, jsContent, 'utf8', (err) => {
//       if (err) {
//         console.error('Error writing JS file:', err);
//         return;
//       }
//       console.log(`JavaScript file generated successfully: ${jsOutputFile}`);
//     });
//   });
// }

// //========================IMG Folder template worker=================//

// function generateImageFiles(outputPath) {
//   // Create the "img" folder in the output path if it doesn't exist
//   const imgFolderPath = path.join(outputPath, 'img');
//   fs.mkdirSync(imgFolderPath, { recursive: true });

//   // Copy the image files from the template folder to the "img" folder
//   const imgFiles = ['project1.png', 'project2.png', 'project3.png', 'about-image.jpg', 'contact-image.png'];
//   imgFiles.forEach((imgFile) => {
//     const imgSrc = path.join('TemplateFolder/img', imgFile);
//     const imgDest = path.join(imgFolderPath, imgFile);
//     fs.copyFile(imgSrc, imgDest, (err) => {
//       if (err) {
//         console.error(`Error copying image file ${imgFile}:`, err);
//         return;
//       }
//       console.log(`Image file ${imgFile} copied successfully to ${imgDest}`);
//     });
//   });
// }

// //========================OutPut Folder worker=================//

// function generateOutputFolder(data) {
//   // Generate the output folder path based on the current date and time
//   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
//   const folderName = `OutputFolder_${timestamp}`;
//   const outputFolderPath = path.join(__dirname, folderName);
//   fs.mkdirSync(outputFolderPath);

//   // Generate HTML, CSS, JS, and image files in the output folder
//   generateHTMLFile(data, outputFolderPath);
//   generateCSSFile(outputFolderPath);
//   generateJSFile(outputFolderPath);
//   generateImageFiles(outputFolderPath);
// }

// //========================DATA Builder=================//

// generateOutputFolder(data);
//#endregion