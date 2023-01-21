element = document.getElementById("devlogs");
element.innerHTML = "Hm, it seems the RSS URL hasn't been found.";

const RSS_URL = `./devlog.rss`;
const regex = new RegExp('"\\s*(https.{1,}\\.\\w{1,4})\\s*"', 'gm');
const MAX_DEVLOGS_TO_SHOW = 10;

fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => parseRSS(data))

function parseRSS(data) {
    if (data.querySelectorAll("rss").length == 0) {
        return;
    }

    let items = data.querySelectorAll("item");
    let html = ``;
    let devlogsToShow = items.length;
    if (devlogsToShow > MAX_DEVLOGS_TO_SHOW) {
        devlogsToShow = MAX_DEVLOGS_TO_SHOW;
    }

    if (devlogsToShow == 0) {
        element = document.getElementById("devlogs");
        element.innerHTML = "There are no devlogs to display.";
        return;
    }

    for(let i = 0; i < devlogsToShow; i++) {
        let item = items[i];
        let description = item.querySelector("description").innerHTML;
        let imageURL = "";
        
        if (description == null) {
            imageURL = "./img/game/game-logo.png";
        } else {
            imageURL = description.match(regex)[0];
        }

        html += `
        <article>
            <a href="${item.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                <div>
                    <img src=${imageURL} alt=""><h2>${item.querySelector("title").innerHTML}</h2>
                </div>
            </a>
        </article>
        `;
    }
    
    document.getElementById("devlogs").innerHTML = html;
}