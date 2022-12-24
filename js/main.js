(() => {
    get_image.then(response => {
        const monitor_type = () => { return (document.body.offsetWidth < document.body.offsetHeight) || (document.getElementById("bg_hd").getBoundingClientRect().left - 300 < 0) && (document.getElementById("bg_hd").getBoundingClientRect().top > document.body.offsetHeight) ? "portrait" : "landscape" }

        function correct_widths()
        {
            if (monitor_type() == "landscape")
            {
                document.getElementById("bg_hd").style.height = "100%"
                document.getElementById("bg_hd").style.width = "initial"
                document.getElementById("bg_hd").style.aspectRatio = `1 / ${1 / (document.getElementById("bg_hd").naturalWidth / document.getElementById("bg_hd").naturalHeight)}`
                document.getElementById("img_wrapper").style.justifyContent = "right"
                document.getElementById("img_wrapper").style.alignItems = "center"
                document.getElementById("description").style.marginRight = document.getElementById("bg_hd").offsetWidth + 15 + "px"
                document.getElementById("title").style.marginRight = document.getElementById("bg_hd").offsetWidth + 15 + "px"
            }
            else
            {
                document.getElementById("bg_hd").style.width = "100%"
                document.getElementById("bg_hd").style.height = "initial"
                document.getElementById("bg_hd").style.aspectRatio = `${(document.getElementById("bg_hd").naturalWidth / document.getElementById("bg_hd").naturalHeight)} / 1`
                document.getElementById("img_wrapper").style.justifyContent = "center"
                document.getElementById("img_wrapper").style.alignItems = "flex-start"
                document.getElementById("description").style.marginRight = "15px"
                document.getElementById("title").style.marginRight = "15px"
            }

            if (document.getElementById("title").offsetWidth < 250)
            {
                document.getElementById("img_wrapper").style.justifyContent = "center"
                document.getElementById("title").style.opacity = "0"
                document.getElementById("description").style.opacity = "0"
            }
            else
            {
                document.getElementById("title").style.opacity = "1"
                document.getElementById("description").style.opacity = "1"
            }
        }

        window.addEventListener("resize", correct_widths)


        const params = JSON.parse(response.params)
        console.log(`Remaining requests: ${response.headers.match(/[\n\r].*x-ratelimit-remaining: \s*([^\n\r]*)/)[1]} out of ${response.headers.match(/[\n\r].*x-ratelimit-limit: \s*([^\n\r]*)/)[1]}`)

        document.getElementById("title").innerText = params.title
        document.getElementById("description").innerText = params.explanation
        document.getElementById("date").innerText = params.date
        document.getElementById("bg_hd").src = params.hdurl
        document.getElementById("blur_bg").style.backgroundImage = `url(${params.hdurl})`
        document.body.style.backgroundImage = `url(${params.hdurl})`

        if (params.copyright) document.getElementById("copyright").innerText = params.copyright
        else document.getElementById("copyright").style.display = "none"

        correct_widths()
    })
})()
