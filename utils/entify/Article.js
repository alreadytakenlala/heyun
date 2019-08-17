export class Article {
  constructor(title, description, topic, time, icoUrl, readNumber) {
    this.title = title;
    this.description = description;
    this.topic = topic;
    this.time = time;
    this.icoUrl = icoUrl;
    this.readNumber = readNumber;
  }

  getTitle(){
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getTopic() {
    return this.topic;
  }

  getTime() {
    return this.time;
  }

  geIcoUrl() {
    return this.icoUrl;
  }

  getReadNumber() {
    return this.readNumber;
  }
}