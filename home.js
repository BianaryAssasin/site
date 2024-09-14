const news = document.getElementById("news");
const load = document.getElementById("load");

let index = 0;
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
    if(index != 0) {
        data.splice(0, index);
    }

    for(let i = 0; i < data.length; i++) {
        if(i >= index) {
            index = i;
            load.style.display = "block";
        }
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
}

load.addEventListener("click", loadData);
loadData();

function articleOpen(uuid) {
    window.location.href = `./page/article.html?id="${uuid}"`;
}
