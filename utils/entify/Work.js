export class Work {
  constructor(bj, subject, content, photoPaths, publisher, claim, signature, time, status) {
    this.bj = bj;
    this.subject = subject;
    this.content = content;
    this.photoPaths = photoPaths;
    this.publisher = publisher;
    this.claim = claim;
    this.signature = signature;
    this.time = time;
    this.status = status;
  }

  getBj() {
    return this.bj;
  }

  getSubject() {
    return this.subject;
  }

  getContent() {
    return this.content;
  }

  getPhotoPaths() {
    return this.photoPaths;
  }

  getPublisher() {
    return this.publisher;
  }

  getClaim() {
    return this.claim;
  }

  getSignature() {
    return this.signature;
  }

  getTime() {
    return this.tiem;
  }

  getStatus() {
    return this.status;
  }
}