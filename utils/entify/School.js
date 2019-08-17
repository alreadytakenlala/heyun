export class School {
  constructor(name, district, bjList) {
    this.name = name;
    this.district = district;
    this.bjList = bjList;
  }

  getName() {
    return this.name;
  }

  getBjList() {
    return this.bjList;
  }

  getDistrict() {
    return this.district;
  }
}