import { loadSubpageHeaderFooter } from "../js/utils.mjs"

loadSubpageHeaderFooter();

// 因為市府API有 CORS 限制，使用 cors-anywhere 當中介
const proxy = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://hispark.hccg.gov.tw/OpenData/GetParkInfo?ParkID=1111104155049';
const fullUrl = proxy + url;

async function getData() {
    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        doStuff(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function doStuff(data) {
    const main = document.querySelector('main');
    if (!main) {
        console.warn('<main> element not found!');
        return;
    }

    data.forEach((park) => {
        const div = document.createElement('div');
        div.textContent = park.PARKINGNAME;
        main.appendChild(div);
    });
}

getData();