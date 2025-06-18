const apiurl = 'https://bernie0316.github.io/parkHere/public/data/parking.json';
const fullUrl = apiurl;

// cors 暫時性破解：
// const proxy = 'https://cors-anywhere.herokuapp.com/';
// const xinzhuURL = 'https://hispark.hccg.gov.tw/OpenData/GetParkInfo?ParkID=1111104155049';
// const fullUrl = proxy + xinzhuURL;

async function convertToJson(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default class ExternalServices {
  constructor() {}
  async getData() {
    const response = await fetch(fullUrl
    //   , {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }
  );
    const data = await convertToJson(response);
    return data;
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by this browser.');
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        }, 
        (error) => reject('定位失敗：' + error.message)
      );
      }
    });
  }

  async getAllParks() {
    return await this.getData();
  }

  async findParkByNo(parkNo) {
    try {
      const allParks = await this.getAllParks();
      const target = allParks.find(p => p.PARKNO === parkNo);
      return target || null;
    } catch (err) {
      console.error("findParkById error:", err);
      return null;
    }
  }
}

///////////////////////
