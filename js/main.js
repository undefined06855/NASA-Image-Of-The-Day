new Promise((resolve, reject) => {
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
}).then(response => {
    var fullscreen = false

    document.getElementById("fullscreen_btn").addEventListener("click", () => {
        if (fullscreen)
        {
            fullscreen = false
            document.exitFullscreen()
            
            document.querySelector("i").classList.remove("fa-compress")
            document.querySelector("i").classList.add("fa-expand")

            document.getElementById("title").classList.remove("hide")
            document.getElementById("description").classList.remove("hide")
        }
        else
        {
            fullscreen = true
            document.body.requestFullscreen();
        
            document.querySelector("i").classList.remove("fa-expand")
            document.querySelector("i").classList.add("fa-compress")
    
            document.getElementById("title").classList.add("hide")
            document.getElementById("description").classList.add("hide")
    
            document.body.addEventListener("fullscreenchange", () => {
                if (!document.fullscreenElement)
                {
                    fullscreen = false
                    document.querySelector("i").classList.remove("fa-compress")
                    document.querySelector("i").classList.add("fa-expand")
    
                    document.getElementById("title").classList.remove("hide")
                    document.getElementById("description").classList.remove("hide")
                }
            })
        }
    })

    const params = JSON.parse(response.params)
    console.log(`Remaining requests: ${response.headers.match(/[\n\r].*x-ratelimit-remaining: \s*([^\n\r]*)/)[1]} out of ${response.headers.match(/[\n\r].*x-ratelimit-limit: \s*([^\n\r]*)/)[1]}`)

    document.getElementById("title").innerText = params.title
    document.getElementById("description").innerText = params.explanation
    document.getElementById("date").innerText = params.date
    document.getElementById("img").src = params.hdurl
    document.getElementById("blur_bg").style.backgroundImage = `url(${params.hdurl})`
    document.body.style.backgroundImage = `url(${params.hdurl})`

    if (params.copyright) document.getElementById("copyright").innerText = params.copyright
    else document.getElementById("copyright").style.display = "none"
})
