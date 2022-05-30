element = document.getElementById("devlogs");
element.innerHTML = "Either the RSS URL is broken, or there are no published devlogs.";

const RSS_URL = `./devlog.rss`;
const re = new RegExp(`https:\/\/img.itch.zone\/(.*)" `);
const MAX_DEVLOGS_TO_SHOW = 10;

fetch(`./devlog.rss`)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => parseRSS(data))

function parseRSS(data) {
    const items = data.querySelectorAll("item");
    let html = ``;
    let devlogsToShow = items.length;
    if (devlogsToShow > MAX_DEVLOGS_TO_SHOW) {
        devlogsToShow = MAX_DEVLOGS_TO_SHOW;
    }

    for(let i = 0; i < devlogsToShow; i++) {
        let el = items[i];
        let description = re.exec(el.querySelector("description").innerHTML);
        let imageURL = description[0].replace(`" `, "");

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