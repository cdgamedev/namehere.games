const developmentVideos = [
    
]

var highlightedImageId = "";

window.onload = function() {
    createHightlightStrip("current-development", developmentVideos, './img/game/gameplay-image-', 6)
}

function createHightlightStrip(parentId, youtubeVideos, imageBaseURL, numberOfImages) {
    if (youtubeVideos.length > 0) {
        embedYouTube(parentId, youtubeVideos)
    }
    if (numberOfImages > 0) {
        createImages(parentId, imageBaseURL, numberOfImages);
    }

    focusImage(parentId, 0);
}

function focusImage(parentId, imageIndex) {
    let elementId = `${parentId}-${imageIndex}`;

    if (highlightedImageId == elementId) {
        return;
    }

    let largeElement = document.getElementById(`${parentId}-large`);
    let imageElement = document.getElementById(elementId);
    
    highlightedImageId = elementId;

    largeElement.innerHTML = '';
    largeElement.appendChild(imageElement.cloneNode(true));

    updateBorder(parentId, imageElement);
}

function createImages(parentId, baseURL, numberOfImages) {
    let parentElement = document.getElementById(`${parentId}-showcase`);
    for (let i = 0; i < numberOfImages; i++) {
        let span = document.createElement("span");
        let elementId = `${parentId}-${i}`;
        let element = document.createElement("img");
        
        span.className = "video-thumbnail";

        element.id = elementId;
        element.src = `${baseURL}${i}.png`;
        element.onclick = function() { focusImage(parentId, i) };
        span.appendChild(element);

        parentElement.appendChild(span);
    }
}

function embedYouTube(parentId, videoIdList) {
    let parentElement = document.getElementById(`${parentId}-showcase`);

    videoIdList.forEach(video => {
        let elementId = `${parentId}-${video}`;
        let span = document.createElement("span");
        let img = document.createElement("img");

        span.innerHTML = `
            <i class="fa-solid fa-circle fa-stack-lg stack-bottom"></i>
            <i class="fa-solid fa-circle-play fa-stack-lg stack-top"></i>`;
        
        img.onclick = function() { focusVideo(parentId, video) };
        img.id = elementId;

        span.className = "video-thumbnail";
        span.appendChild(img);

        img.src = `https://img.youtube.com/vi/${video}/0.jpg`
        parentElement.appendChild(span);

        if (videoIdList[0] == video) {
            img.onclick.apply();
        }
    });
}

function focusVideo(parentId, youtubeVideoId) {
    let elementId = `${parentId}-${youtubeVideoId}`;

    if (highlightedImageId == elementId) {
        return;
    }

    let largeElement = document.getElementById(`${parentId}-large`);
    let imageElement = document.getElementById(elementId);
    let iframe = document.createElement("iframe");

    highlightedImageId = elementId;

    iframe.src = `https://www.youtube.com/embed/${youtubeVideoId}`;
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    largeElement.innerHTML = '';
    largeElement.appendChild(iframe);

    updateBorder(parentId, imageElement);
}

function updateBorder(parentId, imageElement) {
    let parentElement = document.getElementById(`${parentId}-showcase`);
    parentElement.childNodes.forEach(child => {
        if (child.tagName == "SPAN") {
            let img = child.lastChild;
            if (img.id != imageElement.id) {
                img.classList.remove("selected");
            }
        }
    });

    imageElement.classList.add("selected");
}