import { loadHeaderFooter } from "./utils.mjs";

import ExternalServices from './ExternalService.mjs';

loadHeaderFooter(); // 載入 header footer

const service = new ExternalServices();

async function renderParks() {
  try {
    const parks = await service.getAllParks(); // 拿到 JSON 陣列
    const container = document.querySelector('#parkList');

    container.innerHTML = parks.map(p => `
      <li class="park-card">
        <a href="/parking_pages/?park=${p.PARKNO}">
          <h2>${p.PARKINGNAME}</h2>
          <p>地址：${p.ADDRESS}</p>
          <p>剩餘車位：${p.FREEQUANTITY ?? '未知'}</p>
          <p>總車位：${p.TOTALQUANTITY}</p>
        </a>
      </li>
    `).join('');
  } catch (err) {
    console.error("載入停車場資料失敗:", err);
    document.querySelector('#parkList').textContent = '資料載入失敗';
  }
}

renderParks();