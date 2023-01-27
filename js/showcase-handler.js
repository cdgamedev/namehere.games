fetch('./json/showcases.json')
    .then(response => response.json())
    .then(json => loadAllShowcases(json));

function loadAllShowcases(json) {
    let showcases = json["active-showcases"];
    for(let i = 0; i < showcases.length; i++) {
        let showcaseId = showcases[i];
        loadShowcase(json[showcaseId], showcaseId);
    }
}

function loadShowcase(showcase, showcaseId) {
    let showcaseElement = getShowcase(showcaseId);
    let largeImage = getLargeImage(showcaseId);

    for(let i = 0; i < showcase.length; i++) {
        let elementId = `${showcaseId}-${i}`;
        let media = showcase[i];
        let mediaElement = handleMedia(media, elementId, showcaseId, largeImage);
        if (mediaElement != null) {
            showcaseElement.appendChild(mediaElement);
        }
    }

    let initialId = `${showcaseId}-${0}`;
    let initialDescription = showcase[0]["description"];
    focusImage(initialId, showcaseId, largeImage, initialDescription)
}

function getLargeImage(showcaseId) {
    return document.getElementById(`${showcaseId}-large`);
}

function getShowcase(showcaseId) {
    return document.getElementById(`${showcaseId}-showcase`);
}

function handleMedia(media, elementId, showcaseId, largeImage) {
    let mediaElement = null;

    if (media["type"] == "img") {
        mediaElement = handleImage(media, elementId, showcaseId, largeImage);
    } else if (media["type"] == "video") {
        mediaElement = handleVideo(media, elementId, largeImage);
    }

    return mediaElement;
}

function handleImage(image, elementId, showcaseId, largeImage) {
    let container = createContainerElement();
    let mediaElement = createMediaElement(elementId);
    let description = image["description"];
    console.log(image["description"]);
    mediaElement.src = image["url"];
    mediaElement.onclick = function() { focusImage(elementId, showcaseId, largeImage, description) };

    container.appendChild(mediaElement);
    return container;
}

function handleVideo(video) {
    let container = createContainerElement();
    let mediaElement = createMediaElement();
    let videoId = video["url"];

    mediaElement.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    return container;
}

function createContainerElement() {
    let base = document.createElement("span");
    base.className = "image-thumbnail";
    return base;
}

function createMediaElement(elementId) {
    let element = document.createElement("img");

    element.id = elementId;

    return element;
}

function focusImage(elementId, showcaseId, largeImage, description) {
    console.log(description);
    let highlightedImageId = largeImage.childNodes[0].id;

    if (highlightedImageId == elementId) {
        return;
    }
    
    let imageElement = document.getElementById(elementId);

    largeImage.innerHTML = "";
    
    highlightedImageId = elementId;
    
    let textElement = document.createElement("p");
    textElement.innerHTML = description;

    largeImage.appendChild(imageElement.cloneNode(true));
    largeImage.appendChild(textElement);

    updateBorders(showcaseId, imageElement);
}

function updateBorders(showcaseId, imageElement) {
    let parentElement = document.getElementById(`${showcaseId}-showcase`);
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