import{c as r,d as i,l as c,b as n}from"./utils--r_zglHE.js";import{P as o}from"./ProductData-AZKCg8GK.js";function l(t){const e=t.FinalPrice<t.SuggestedRetailPrice;return`<li class="product-card">
    <a href="/product_pages/?product=${t.Id}">
      <img src="${t.Images.PrimaryMedium}" alt="Image of ${t.Name}">
      <h2 class="card__brand">${t.Brand.Name}</h2>
      <h3 class="card__name">${t.Name}</h3>
      <p class="product-card__price">
        $${t.FinalPrice}
        ${e?'<span class="discount-flag">Discount!</span>':""}
      </p>
    </a>
  </li>`}class d{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").textContent=r(this.category)}renderList(e){i(l,this.listElement,e)}}c();const m=n("category"),u=new o,g=document.querySelector(".product-list"),h=new d(m,u,g);h.init();
