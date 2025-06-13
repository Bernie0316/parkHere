// 引入API資料呼叫模組
import ExternalServices from "./ExternalService.mjs";
// loadHeaderFooter: 會把共用的 header 和 footer 載入頁面中。
// getParam: 從網址中擷取 ?product=xxxx 的停車場 ID。
import { loadHeaderFooter , getParam } from "./utils.mjs";
// ProductDetails: 負責顯示停車場詳細資訊的模組。
import ParkDetails from "./parkDetails.mjs";

loadHeaderFooter();


// 建立一個資料來源的實例（這裡的 "tents" 表示要讀取帳篷商品的資料）。
const dataSource = new ExternalServices("parking");
// 從網址的參數中取得目前這個商品的 ID。
const parkNo = getParam("park");

// 建立 ProductDetails 的實例，並呼叫 init() 來：
// 取得該商品的資料。
// 把資料渲染到頁面上。
// 綁定「加入購物車」按鈕的功能。
const park = new ParkDetails(parkNo, dataSource);
park.init();