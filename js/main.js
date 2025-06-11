import { loadHeaderFooter } from "./utils.mjs";

import ExternalServices from './ExternalService.mjs';

loadHeaderFooter(); // 載入 header footer

const service = new ExternalServices();

async function renderParks() {
  try {
    const parks = await service.getAllParks(); // 拿到 JSON 陣列
    const container = document.querySelector('#parkList');

    container.innerHTML = parks.map(p => `
      <div class="park-card">
        <h2>${p.AREA} - ${p.NAME}</h2>
        <p>地址：${p.ADDRESS}</p>
        <p>總車位：${p.TOTALSPACE}</p>
        <p>剩餘車位：${p.SURPLUSSPACE ?? '未知'}</p>
      </div>
    `).join('');
  } catch (err) {
    console.error("載入停車場資料失敗:", err);
    document.querySelector('#parkList').textContent = '資料載入失敗';
  }
}

renderParks();