
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
