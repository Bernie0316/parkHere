// wrapper for querySelector...returns matching element
// 用於簡化 querySelector 的寫法。
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// set a listener for both touchend and click

//  同時支援 click 與 touchend，適合行動裝置。
// 實用的事件綁定函式，建議保留。
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// 從 URL 查詢字串中擷取參數（如 ?product=1234）。
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}

// 將清單資料批次渲染進 HTML 元素中。
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  clear ? parentElement.innerHTML = "" : 0; 
  const htmlStrings = list.map(templateFn);
  if(clear){
    parentElement.innerHTML = "";
  };
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// 將 template 字串渲染進 DOM
export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.innerHTML = template;
  if(callback){
    callback(data);
  }
}

// 非同步讀取 HTML 檔案並回傳字串。
export async function loadTemplate(path){
  const item = await fetch(path);
  const template = item.text();
  return template;
}

export async function loadHeaderFooter (){
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const headerContent = await loadTemplate("https://bernie0316.github.io/parkHere/public/partials/header.html");
  const footerContent = await loadTemplate("https://bernie0316.github.io/parkHere/public/partials/footer.html");

  renderWithTemplate(headerContent, header);
  renderWithTemplate(footerContent, footer);
}

export function capitalizeFirstLetter(text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}  