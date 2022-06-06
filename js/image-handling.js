const youtubeVideos = [
    "BES0WkYXtyE"
]

window.onload = function() {
    embedYouTube("current-development", youtubeVideos)
    createImages("current-development", './img/game/screenshot-', 5, 1);
}

function focusImage(parentId, imageIndex) {
    let largeElement = document.getElementById(`${parentId}-large`);
    let elementId = `${parentId}-${imageIndex}`;
    let imageElement = document.getElementById(elementId);

    largeElement.innerHTML = '';
    largeElement.appendChild(imageElement.cloneNode(true));

    let parentElement = document.getElementById(`${parentId}-showcase`);
    parentElement.childNodes.forEach(child => {
        if (child.tagName == "IMG") {
            child.className = "";
        }
    });

    imageElement.className = "selected";
}

function createImages(parentId, baseURL, numberOfImages, offset) {
    let parentElement = document.getElementById(`${parentId}-showcase`);
    for (let i = 0; i < numberOfImages; i++) {
        let span = document.createElement("span");
        let elementId = `${parentId}-${i + offset}`;
        let element = document.createElement("img");
        
        span.className = "video-thumbnail";

        element.id = elementId;
        element.src = `${baseURL}${i + offset}.png`;
        element.onclick = function() { focusImage(parentId, i + offset) };
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

        span.className = "video-thumbnail";
        span.id = elementId;
        span.appendChild(img);

        img.src = `https://img.youtube.com/vi/${video}/0.jpg`
        parentElement.appendChild(span);
    });
}