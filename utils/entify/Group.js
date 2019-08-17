export class Group extends Object {
  constructor(title, persons) {
    super();
    this.title = title;
    this.persons = persons;
  }

  getTitle() {
    return this.title;
  }

  getPersons() {
    return this.persons;
  }
}