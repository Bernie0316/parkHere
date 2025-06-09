import ExternalServices from "./ExternalService.mjs";
import ParkList from "./ParkList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs"

loadHeaderFooter();

const dataSource = new ExternalServices();

const category = getParam();
const listElement = document.querySelector('.product-list');
const productList = new ParkList(dataSource, listElement);
productList.init();