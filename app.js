const express = require("express")
const multer = require("multer")
const fs = require("fs")
const app = express();

const port = 3000;
const publicPath = "public/";
const uploadPath = './public/uploads';

app.use(express.static(publicPath));
app.use(express.json())
let storage = multer.diskStorage({
    destination: function(request, file, cb){
        cb(null, uploadPath)
    },
    filename: function(request, file, cb){
        cb(null, Date.now() + "")
    }
})
const upload = multer({
    storage: storage,

})
app.set("views", "./views")
app.set("view engine", "pug")

// const uploadedFiles = [
//     'baconCat.jpg',
//     "catHead.jpg",
//     "dominatingCat.jpeg",
//     "flyingCat.jpeg",
// ]
app.get("/", function (request, response) {
    fs.readdir(uploadPath, function (err, items) {
        console.log(items);

        response.render("index", {
            title: "Hey",
            message: "this is a message",
            imagePathArray: items.reverse()
        });
    });
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
    console.log("Uploaded: " + request.file.filename);
    // uploadedFiles.push(request.file.filename);
    response.end(`<a href="/">Go Back</a> <img src="uploads/${request.file.filename}"/>`);
})

app.post('/latest', function (request, response, next) {
    console.log("Uploaded: ");
    let newImagesArray = []
    let lastImageClientSaw = request.body.lastImageClientSaw
    let highestTimeStamp = 0
    fs.readdir(uploadPath, function (err, imageNames) {
        imageNames.forEach(image => {
            let imageUploadedTime = fs.statSync(`public/uploads/${image}`).mtimeMs;
            if (imageUploadedTime > lastImageClientSaw) {
                newImagesArray.unshift(image)
            }
            if (imageUploadedTime > highestTimeStamp) {
                highestTimeStamp = imageUploadedTime
            }
        })
        response.send({
            images: newImagesArray,
            timestamp: highestTimeStamp
         })
    })
})
app.listen(port);