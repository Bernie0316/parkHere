import { capitalizeFirstLetter, renderListWithTemplate } from "./utils.mjs";

function parkCardTemplate(park) {
  return `<li class="product-card">
    <a href="/park_pages/?park=${park.PARKNO}">
    //   <h2 class="card__brand">${park.Brand.PARKINGNAME}</h2>
    //   <h3 class="card__name">${park.PARKINGNAME}</h3>
    </a>
  </li>`;
}

export default class ProductList {
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