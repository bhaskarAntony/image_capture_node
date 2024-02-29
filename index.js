// // Import necessary packages
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;
// const NodeWebcam = require('node-webcam');

// // Create an instance of express app
// const app = express();
// const Webcam = NodeWebcam.create();

// // Connect to MongoDB using Mongoose
// mongoose.connect('mongodb+srv://bhaskarAntoty123:bhaskar3958@bhaskarantony.wagpkay.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err);
// });

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'don3z4vy9',
//   api_key: '939324144567317',
//   api_secret: 'zW1PbxjLgEJp3ddDgOxvWHmBw7E'
// });

// // Configure multer storage for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads', // Folder where the image will be stored in Cloudinary
//     allowed_formats: ['jpg', 'png'], // Allowed image formats
//     transformation: [{ width: 500, height: 500, crop: 'limit' }] // Resize the image
//   }
// });

// // Create multer middleware instance
// const upload = multer({ storage: storage });

// // Define a Mongoose schema
// const imageSchema = new mongoose.Schema({
//   imageUrl: String
// });

// // Create a Mongoose model
// const Image = mongoose.model('Image', imageSchema);

// // Define a route for image upload
// app.get('/capture', async (req, res) => {
//     try {
//       // Capture image using webcam
//       Webcam.capture('captured_image', async (err, data) => {
//         if (err) {
//           console.error('Error capturing image:', err);
//           res.status(500).json({ error: 'Error capturing image' });
//           return;
//         }
  
//         // Upload captured image to Cloudinary
//         const result = await cloudinary.uploader.upload(data, {
//           folder: 'uploads'
//         });
  
//         // Save the image URL in MongoDB
//         const newImage = new Image({ imageUrl: result.secure_url });
//         await newImage.save();
  
//         // Send the image URL in the response
//         res.status(200).json({ imageUrl: result.secure_url });
//       });
//     } catch (error) {
//       console.error('Error capturing and uploading image:', error);
//       res.status(500).json({ error: 'Error capturing and uploading image' });
//     }
//   });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
const express = require('express');
const { exec } = require('child_process');
const os = require('os');

const app = express();

// Function to initiate system shutdown
function powerOff() {
    if (os.platform() === 'win32') {
        // For Windows
        console.log("Shutting down Windows system.");
        return exec('shutdown /s /t 1');
    } else {
        // For Unix-based systems
        console.log("Shutting down Unix-based system.");
        return exec('sudo shutdown -h now');
    }
}

// Route to render homepage
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Route to initiate shutdown
app.get('/shutdown', (req, res) => {
    const result = powerOff();
    res.send(`Shutting down... Result: ${result}`);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
