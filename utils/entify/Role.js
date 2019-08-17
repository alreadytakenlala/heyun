export class Role {
  constructor(accountNumber, name, career, school, bj, graduation, gender)
  {
    this.accountNumber = accountNumber;
    this.name = name;
    this.career = career;
    this.school = school;
    this.bj = bj;
    this.graduation = graduation;
    this.gender = gender;
  }

  getAccountNumber() {
    return this.accountNumber;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setCareer(career) {
    this.career = career;
  }

  getCareer() {
    return this.career;
  }

  setSchool(school) {
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  setBj(bj) {
    this.bj = bj;
  }

  getBj() {
    return this.bj;
  }

  setGraduation(graduation) {
    this.graduation = graduation;
  }

  getGraduation() {
    return this.graduation;
  }

  setGender(gender) {
    this.gender = gender;
  }

  getGender() {
    return this.gender;
  }
}