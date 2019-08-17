export class City {
  constructor(name, districtList) {
    this.name = name;
    this.districtList = districtList;
  }

  getName() {
    return this.name;
  }

  getDistrict() {
    return this.districtList;
  }
}