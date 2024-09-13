const news = document.getElementById("news");

async function loadData() {
    const api = await fetch("./config.json");
    const jsonApi = await api.json();
    const response = await fetch("http://localhost:2337/api/blogs2", {
        headers: {
            "Authorization": `Bearer ${jsonApi.strapi_api.key}`
        }
    });
    const json = await response.json();
    const data = json.data;

    for(let item of data) {
        const info = item.attributes;

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
}

loadData();

function articleOpen(uuid) {
    window.location.href = `./page/article.html?id="${uuid}"`;
}