const proxy = 'https://cors-anywhere.herokuapp.com/';
const xinzhuURL = 'https://opendata.hccg.gov.tw/OpenDataDetail.aspx?n=1&s=452';
const fullUrl = proxy + xinzhuURL;

async function convertToJson(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default class ExternalServices {
  constructor() {}
  async getData() {
    const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          });
    const data = await convertToJson(response);
    return data;
  }
  async getAllParks() {
    return await this.getData();
  }
  async findParkById(parkNo) {
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