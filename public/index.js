let timeInMs = Date.now();
let errors = 0;

function checkForNewImage() {
    return fetch("http://localhost:3000/latest", {
            method: "POST",
            body: JSON.stringify({"lastImageClientSaw": timeInMs}),
            // json.stringify turns the object into a string that can be sent
            headers: {"Content-Type": "application/json; charset=utf-8"}
        })
        .then(response => response.json())
// add a throw message here.
        .then(data => {
            data.images.forEach(appendNewestImage)
            timeInMs = data.timestamp   
            setTimeout(checkForNewImage, 5000) 
            // data is going to be the image and timestamp data
        })
        .catch(function(error){
            errors += 1
            if (errors > 2){
                checkForNewImage()
            }else{
                alert("We're broken.  Move on.")
            }
            console.log(error)
        })
    }

setTimeout(checkForNewImage, 5000)

function appendNewestImage(image){
    let destination = document.getElementById("imagesContainer")
    const newImg = document.createElement("img");
    newImg.src = `/uploads/${image}`;
    newImg.width = 300;
    destination.insertBefore(newImg, destination.firstChild)
}
// timestamp: save timestamp to after.  Client timestamp updates to the timestamp the server sent.  Inside .then, you can add language to reset error function to work only in event of 2 consecutive errors.