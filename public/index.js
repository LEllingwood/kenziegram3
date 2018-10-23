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
        // .catch(errorFunction(error))
        // this fetch needs a catch.  catch catches errors that can then be handled(usually with a message). you need an if statement inside catch that says if errors > 2, alert to user a message telling them to give up.  define errors (=0), outside of catch. 
        // 
        // function errorFunction(){
        //     if(errors > )
        // }
    }

setTimeout(checkForNewImage, 5000)

function appendNewestImage(image){
    let destination = document.getElementById("imagesContainer")
    const newImg = document.createElement("img");
    destination.appendChild(newImg);
}
// timestamp: save timestamp to after.  Client timestamp updates to the timestamp the server sent.  Inside .then, you can add language to reset error function to work only in event of 2 consecutive errors.