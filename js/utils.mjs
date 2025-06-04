export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.innerHTML = template;
  if(callback){
    callback(data);
  }
}


export async function loadTemplate(path){
  const item = await fetch(path);
  const template = await item.text();
  return template;
}

export async function loadHeaderFooter (){
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const headerContent = await loadTemplate("/public/partials/header.html");
  const footerContent = await loadTemplate("/public/partials/footer.html");

  try {
    renderWithTemplate(headerContent, header);
    renderWithTemplate(footerContent, footer);
  }
  catch (error) {
    console.error("Error loading header or footer:", error);
  }

  // updateCartCount();
}
// function updateCartCount() {
//   const countElement = document.querySelector(".cart-count");
//   const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
//   if (countElement) {
//     countElement.textContent = cart.length;
//   }
// }