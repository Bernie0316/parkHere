import{l as d,g as o,a as i,s as u,r as m}from"./utils--r_zglHE.js";d();function n(){document.querySelector(".product-list").innerHTML="";const t=o("so-cart")||"The Cart Is Empty";if(t!="The Cart Is Empty"){const a=t.map(e=>p(e));document.querySelector(".product-list").innerHTML=a.join(""),t.forEach(e=>{document.getElementById(e.Id).addEventListener("click",()=>{I(document.getElementById(e.Id))})})}else document.querySelector(".product-list").innerHTML=t}function p(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Images.PrimarySmall}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${t.Quantity}</p>
  <p class="cart-card__price">$${(t.FinalPrice*t.Quantity).toFixed(2)}</p>
  <span class="remove-item" id="${t.Id}"><b>X</b></span>
</li>`}function I(t){const a=t.id,e=o("so-cart");let r=i(e,"Id",a);e.splice(r,1),u("so-cart",e),e.length==0&&m("so-cart"),n()}function y(t){if(t==null||!t||t.length===0)return;let a=0;t.forEach(c=>{const s=parseFloat(c.FinalPrice||c.price||0),l=c.Quantity||1;a+=s*l});const e=document.querySelector(".cart-footer"),r=document.querySelector(".cart-total");r&&e&&(r.textContent=a.toFixed(2),e.classList.remove("hide"))}const g=o("so-cart");n();y(g);n();document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".cart-count"),a=JSON.parse(localStorage.getItem("so-cart"))||[];t.textContent=a.length});
