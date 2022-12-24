const get_image = new Promise((resolve, reject) => {
    const req_params = "api_key=DEMO_KEY"

    const req = new XMLHttpRequest()

    req.open("GET", `https://api.nasa.gov/planetary/apod?${req_params}`, true)

    req.addEventListener("readystatechange", () => {
        if (req.readyState == 4 && req.status == 200) resolve({params: req.responseText, headers: req.getAllResponseHeaders()})
        else if (req.readyState > 1 && req.status != 200)
        {
            document.getElementById("error_text").innerText = "There was an error! Try refreshing the page or waiting a bit.\n\nIf none of those work, you may have reached your maximum limit of loading images. Please wait until an hour has passed since you first loaded the webpage."
            reject(`Request rejected (readyState: ${req.readyState}, status: ${req.status})`)
        }
    })

    req.send()
})
