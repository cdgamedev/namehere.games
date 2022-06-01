window.onload = function() {
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
        child.className = "";
    });

    imageElement.className = "selected";
}

function createImages(parentId, baseURL, numberOfImages, offset) {
    let parentElement = document.getElementById(`${parentId}-showcase`);
    for (let i = 0; i < numberOfImages; i++) {
        let elementId = `${parentId}-${i + offset}`;
        let element = document.createElement("img");
        element.id = elementId;
        element.src = `${baseURL}${i + offset}.png`;
        element.onclick = function() { focusImage(parentId, i + offset) };
        parentElement.appendChild(element);
    }
}