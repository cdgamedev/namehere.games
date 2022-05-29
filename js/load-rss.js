element = document.getElementById("devlogs");
element.innerHTML = "Either the RSS URL is broken, or there are no published devlogs.";

const RSS_URL = `./devlog.rss`;

fetch(`./devlog.rss`)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => console.log(data))

function parse_rss(data) {
    const items = data.querySelectorAll("item");
    let html = ``;

    items.forEach(el => {
        html += `
        <article>
          <img src="${el.querySelector("description").innerHTML}" alt="">
          <h2>
            <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
              ${el.querySelector("title").innerHTML}
            </a>
          </h2>
        </article>
        `;
        html += `
        <article>
          <img src="${el.querySelector("link").innerHTML}/image/large.png" alt="">
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