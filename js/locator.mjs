import ExternalServices from "./ExternalService.mjs";
import ParkList from "./parkList.mjs";

// 等 DOM 載入完成
document.addEventListener("DOMContentLoaded", () => {
  const locateBtn = document.querySelector("#locateBtn");
  const nearestList = document.querySelector(".park-list");

  // 如果找不到按鈕或清單就不繼續
  if (!locateBtn || !nearestList) return;

  const service = new ExternalServices();
  const listRenderer = new ParkList(service, nearestList);

  // 初始化時清空內容
  nearestList.innerHTML = "";

  locateBtn.addEventListener("click", async () => {
    try {
      const userLocation = await service.getCurrentLocation();
      const parks = await service.getData();

      const withDistance = parks.map((park) => {
        const distance = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          park.Lat,
          park.Lng
        );
        return { ...park, distance };
      });

      const nearest = withDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      // 這裡手動清空再 render，避免之前的 listRenderer 被 main.js renderList() 覆蓋
      nearestList.innerHTML = "";
      listRenderer.renderList(nearest);
    } catch (e) {
      nearestList.innerHTML = `<li class="error">⚠️ ${e.message}</li>`;
    }
  });

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function toRad(deg) {
    return deg * (Math.PI / 180);
  }
});
