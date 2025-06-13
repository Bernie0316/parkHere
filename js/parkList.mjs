import { capitalizeFirstLetter, renderListWithTemplate } from "./utils.mjs";

function parkCardTemplate(park) {
  return `<li class="park-card">
    <a href="park_pages/?park=${park.PARKNO}">
      <h2 class="card__brand">${park.PARKINGNAME}</h2>
      <p>地址：${park.ADDRESS}</p>
      <p>剩餘車位：${park.FREEQUANTITY ?? '未知'}</p>
      <p>總車位：${park.TOTALQUANTITY}</p>      
    </a>
  </li>`;
}

export default class ParkList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
        document.querySelector(".title").textContent = capitalizeFirstLetter();
    }

    renderList(list) {
        renderListWithTemplate(parkCardTemplate, this.listElement, list);
    }
}