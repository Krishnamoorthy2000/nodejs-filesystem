const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Create endpoint to create a text file in a folder with current timestamp
app.post('/create-file', (req, res) => {
  // Get folder name from query parameter or use current directory as default
  const folder = req.query.folder || '.';
  
  // Generate filename with current date-time format
  const filename = new Date().toISOString().replace(/[:]/g, '-') + '.txt';
  
  // Create filepath by joining folder and filename
  const filepath = `${folder}/${filename}`;
  
  // Generate content with current date and time
  const content = new Date().toString();

  // Write content to file
  fs.writeFile(filepath, content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating file.' });
    } else {
      res.status(200).json({ message: `File '${filename}' created in folder '${folder}'.` });
    }
  });
});

// Create endpoint to retrieve all text files in a folder
app.get('/get-files', (req, res) => {
  // Get folder name from query parameter or use current directory as default
  const folder = req.query.folder || '.';
  
  // Read all files in folder
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving files.' });
    } else {
      // Filter only text files
      const textFiles = files.filter(file => file.endsWith('.txt'));
      res.status(200).json({ files: textFiles });
    }
  });
});

// Start server on port 5000
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
