// 資料來源工具，用來取得產品資料
import ExternalServices from "./ExternalService.mjs";
// 負責顯示商品列表的 class
import ParkList from "./parkList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// 建立一個資料服務實例，用來呼叫 getData() 或 findProductById() 之類的函式。
const dataSource = new ExternalServices();
const listElement = document.querySelector(".park-list");
// 建立 ProductList 物件，將 category、資料來源、要插入的元素傳入。
const parkList = new ParkList(dataSource, listElement);

// 呼叫資料來源取得分類商品資料。
// 把這些資料渲染進 .product-list 中。
parkList.init();