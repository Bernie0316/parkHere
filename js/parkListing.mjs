import { capitalizeFirstLetter, getResponsiveImage, renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

    // container.innerHTML = parks.map(p => `
    //   <div class="park-card">
    //     <h2>${p.PARKINGNAME}</h2>
    //     <p>地址：${p.ADDRESS}</p>
    //     <p>剩餘車位：${p.FREEQUANTITY ?? '未知'}</p>
    //     <p>總車位：${p.TOTALQUANTITY}</p>
    //   </div>
    // `).join('');

  return `<li class="product-card">
    <a href="/parking_pages/?park=${p.PARKNO}">
      <h2 class="card__brand">${p.PARKINGNAME}</h2>
      <h3 class="card__name">${p.PARKINGNAME}</h3>
      <p class="product-card__price">
        $${product.FinalPrice}
        ${isDiscounted ? `<span class="discount-flag">Discount!</span>` : ""}
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

    async init() {
      const list = await this.dataSource.getData(this.category);
      this.renderList(list);
      document.querySelector(".title").textContent = capitalizeFirstLetter(this.category);
    }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}