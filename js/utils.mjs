export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
        clear ? parentElement.innerHTML = "" : 0; 
        const htmlStrings = list.map(templateFn);
        if(clear){
          parentElement.innerHTML = "";
        };
        parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const product = urlParams.get('product')
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const park = urlParams.get(param)
  return park
}

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
  const headerContent = await loadTemplate("public/partials/header.html");
  const footerContent = await loadTemplate("public/partials/footer.html");

  try {
    renderWithTemplate(headerContent, header);
    renderWithTemplate(footerContent, footer);
  }
  catch (error) {
    console.error("Error loading header or footer:", error);
  }
}

export async function loadSubpageHeaderFooter (){
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const headerContent = await loadTemplate("../public/partials/header.html");
  const footerContent = await loadTemplate("../public/partials/footer.html");

  renderWithTemplate(headerContent, header);
  renderWithTemplate(footerContent, footer);
}

export function capitalizeFirstLetter(text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}  