export default class ParkDetails {
    constructor(parkNo, dataSource) {
        this.parkNo = parkNo;
        this.park = {};
        this.dataSource = dataSource;
    }

    // 初始化方法，呼叫時會：
    async init() {
        // 取得對應產品資料。
        this.park = await this.dataSource.findParkByNo(this.parkNo);
      
        // 把產品資料渲染到畫面上。
        this.renderProductDetails();
    }

    renderProductDetails() {
        parkDetailsTemplate(this.park);
    }
}

function parkDetailsTemplate(park) {
    // details page模板
    document.querySelector('h2').textContent = park.PARKINGNAME;
    document.querySelector('p').textContent = park.ADDRESS;
    document.querySelector('p').textContent = `剩餘車位：${park.FREEQUANTITY ?? '未知'}`;
    document.querySelector('p').textContent = `總車位：${park.TOTALQUANTITY}`;
}