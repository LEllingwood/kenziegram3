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
        .then(data => {
            data.images.forEach(appendNewestImage)
            timeInMs = data.timestamp   
            setTimeout(checkForNewImage, 5000) 
            // data is going to be the image and timestamp data
        })
    }

setTimeout(checkForNewImage, 5000)

function appendNewestImage(image){
    let destination = document.getElementById("imagesContainer")
    const newImg = document.createElement("img");
    newImg.src = `/uploads/${image}`;
    destination.appendChild(newImg);
}
// timestamp: save timestamp to after.  Client timestamp updates to the timestamp the server sent.  Inside .then, you can add language to reset error function to work only in event of 2 consecutive errors.