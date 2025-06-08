const xinzhuURL = 'https://opendata.hccg.gov.tw/OpenDataDetail.aspx?n=1&s=452';

async function convertToJson(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export default class ExternalServices {
  constructor() {}
  async getData() {
    const response = await fetch(xinzhuURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          });
    const data = await convertToJson(response);
    return data;
  }
  async findParkByNo(parkNo) {
    const response = await fetch(`${xinzhuURL}park/${PARKNO}`);
    const data = await convertToJson(response);
    console.log(data);
    return data;
  }
}