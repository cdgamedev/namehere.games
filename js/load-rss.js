element = document.getElementById("devlogs");
element.innerHTML = "Hm, it seems the RSS URL hasn't been found.";

const RSS_URL = `./devlog.rss`;
const re = new RegExp(`https:\/\/img.itch.zone\/(.*)" `);
const MAX_DEVLOGS_TO_SHOW = 10;

fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => parseRSS(data))

function parseRSS(data) {
    if (data.querySelectorAll("rss").length == 0) {
        return;
    }

    const items = data.querySelectorAll("item");
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
        let el = items[i];
        let description = re.exec(el.querySelector("description").innerHTML);
        let imageURL = "";
        if (description == null) {
            imageURL = "./img/game/game-logo.png";
        } else {
            imageURL = description[0].replace(`" `, "");
        }

        html += `
        <article>
            <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                <div>
                    <img src="${imageURL}" alt=""><h2>${el.querySelector("title").innerHTML}</h2>
                </div>
            </a>
        </article>
        `;
    }
    items.forEach(el => {
        
    });
    document.getElementById("devlogs").innerHTML = html;
}