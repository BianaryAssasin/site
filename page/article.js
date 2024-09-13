const title = document.getElementById("title");
const heading = document.getElementById("heading");
const info = document.getElementById("info");
const date = document.getElementById("date");
const image = document.getElementById("image");

async function loadData() {
    const api = await fetch("../config.json");
    const jsonApi = await api.json();
    const uuid_test = new URLSearchParams(window.location.search);
    const uuid = uuid_test.get("id").replaceAll('"', "");
   // if(!uuid) return window.location = "../home.html";

    const response = await fetch(`http://localhost:2337/api/blogs2?filters[uuid][$eq]=${uuid}`, {
        headers: {
            "Authorization": `Bearer ${jsonApi.strapi_api.key}`
        }
    })
    const json = await response.json();
    if(json.data.length === 0) return window.location = "../home.html";
    const data = json.data[0].attributes;
    const information = data.information;

    title.textContent = data.Title;
    heading.textContent = data.Heading;
    date.textContent = data.Date;

    information.forEach(text => {
        if(!text.isImage) {
            info.innerHTML += `<p style="color: ${text.color}">${text.value}</p>`;
        } else {
            info.innerHTML += `<img src="${text.value}" style="width: ${text.width}; height: ${text.height}; ${text.margin} display: block;">`;
        }
    })

    image.src = data.url;
}

loadData();