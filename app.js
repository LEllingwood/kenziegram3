const express = require("express")
const multer = require("multer")
const fs = require("fs")
const app = express();

const port = 3000;
const publicPath = "public/";
const uploadPath = './public/uploads';

app.use(express.static(publicPath));
app.use(express.json())
const upload = multer({dest: uploadPath})
app.set("views", "./views" )
app.set("view engine", "pug")

const uploadedFiles = [
    'baconCat.jpg',
    "catHead.jpg",
    "dominatingCat.jpeg",
    "flyingCat.jpeg",
]
app.get("/", function(request, response){
    fs.readdir(uploadPath, function(err, items) {
        console.log(items);
        response.render("index", {title: "Hey", message: "this is a message", imagePathArray: uploadedFiles});
    });
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded: " + request.file.filename);
    uploadedFiles.push(request.file.filename);
    response.end(`<a href="/">Go Back</a> <img src="uploads/${request.file.filename}"/`);
})

app.post('/latest', function (request, response, next) {
    console.log("Uploaded: " );
    fs.readdir(uploadPath, function(err, imageNames) {
        let imageInfo = {
            timestamp: Date.now(),
            image: uploadedFiles
        }
        imageNames.forEach(image => {
            newImagesArray = []
            let imageUploadedTime = fs.statSync(imgPath).mtimeMs;
            if (imageUploadedTime > lastImageClientSaw){
                newImagesArray.push(image)
            }
            let highestTimeStamp = 0
            if(imageUploadedTime > highestTimeStamp){
                highestTimeStamp = imageUploadedTime
            }
        })

    })
    response.send({
        images: [],
        timestamp: 234233049809
    })
    // response.send(imageInfo)              
    
    app.listen(port);
                
                // {"images: ["image2.jpg", "image3.jpg"], timestamp: number}
                // timestamp: server is checking images for timestamps; it does not generate it's own timestamp.  create a brand new array ever time the server receives a POST request.  an empty [] means no new images have been submitted.
                
                // IMAGES PROBLEM
// app.post("/latest", createArray )
// the ["image2.jpg", "image3.jpg"] array is created by:
// function createArray(){use fs.readdir to create the array.  fs.readdir has a callback function; inside the callback funcction, we'll do this loop:
//     let modified = fs.statSync(imgPath).mtimeMs;
// if (modified > after){
//     push to array to send to client.  

// }}

// TIMESTAMP PROBLEM
// timestamp: find the most recent timestamp.  (get the max value in the array).  Let maxTS = 0; for (let i=0, i < array.length; i++){
//     if (modified > maxTS){
//         maxTS = modified
//     }
// }

// the image and ts issue can be resolved in the same for loop


// can't send javascript; it needs to be json
