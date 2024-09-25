const news = document.getElementById("news");

if(!localStorage.getItem("cache")) {
    localStorage.setItem("cache", JSON.stringify([]));
}
const cache = JSON.parse(localStorage.getItem("cache"));

function preLoad() {
    cache.forEach(article => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML += `
            <img src="${article.attributes.url}">
            <div>
                <h1>${article.attributes.Title}</h1>
                <h4>${article.attributes.Heading}</h4>
            </div>
            <p>${article.attributes.Date}</p>
        `
    })
}

preLoad();

async function loadData() {
    while(news.firstChild) {
        news.removeChild(news.firstChild);
    }

    const api = await fetch("./config.json");
    const jsonApi = await api.json();
    const response = await fetch("https://awesome-books-e07c485b8e.strapiapp.com/api/blogs2", {
        headers: {
            "Authorization": `Bearer ${jsonApi.strapi_api.key}`
        }
    });
    const json = await response.json();
    const data = json.data.reverse();

    for(let i = 0; i < data.length; i++) {
        const info = data[i].attributes;

        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.dataset.uuid = info.uuid;
        itemElement.innerHTML = `
            <img src="${info.url}">
            <div>
                <h1>${info.Title}</h1>
                <h4>${info.Heading}</h4>
            </div>
            <p>${info.Date}</p>
        `
        news.appendChild(itemElement);
        itemElement.addEventListener("click", () => {
            articleOpen(itemElement.dataset.uuid);
        });
    }
    localStorage.setItem("cache", JSON.stringify(data));
}

loadData();

function articleOpen(uuid) {
    window.location.href = `./page/article.html?id="${uuid}"`;
}
