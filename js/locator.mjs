import ExternalServices from "./ExternalService.mjs";
import ParkList from "./parkList.mjs";

const locateBtn = document.querySelector("#locateBtn");
const nearestList = document.querySelector(".park-list");
const service = new ExternalServices();
const listRenderer = new ParkList(service, nearestList);

locateBtn.addEventListener("click", async () => {
  try {
    const userLocation = await service.getCurrentLocation();
    const parks = await service.getData();

    const withDistance = parks
      .map((park) => {
        const distance = getDistance(
          userLocation.latitude,
          userLocation.longitude,
          park.Lat,
          park.Lng
        );
        return { ...park, distance };
      })
      .filter((park) => !isNaN(park.distance)); // 只留下有距離的資料

    const nearest = withDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    listRenderer.renderList(nearest);
  } catch (e) {
    nearestList.innerHTML = `<li class="error">⚠️ ${e.message || e}</li>`;
  }
});

// 計算兩個經緯度的距離（單位：公里）
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}
