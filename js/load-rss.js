element = document.getElementById("devlogs");
element.innerHTML = "Either the RSS URL is broken, or there are no published devlogs.";

const RSS_URL = `./devlog.rss`;
const re = new RegExp(`https:\/\/img.itch.zone\/(.*)" `);

fetch(`./devlog.rss`)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => parseRSS(data))

function parseRSS(data) {
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
        let description = re.exec(el.querySelector("description").innerHTML);
        let imageURL = description[0].replace(`" `, "");
        html += `
        <article>
          <img src="${imageURL}" alt="">
          <h2>
            <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
              ${el.querySelector("title").innerHTML}
            </a>
          </h2>
        </article>
        `;
    });
    document.getElementById("devlogs").innerHTML = html;
}