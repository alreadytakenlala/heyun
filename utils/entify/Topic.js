export class Topic {
  constructor(title, icoUrl, subscriptionNumber, classification, hasSubscription) {
    this.title = title;
    this.icoUrl = icoUrl;
    this.subscriptionNumber = subscriptionNumber;
    this.classification = classification;
    this.hasSubscription = hasSubscription;
  }

  getTitle() {
    return this.title;
  }

  getIcoUrl() {
    return this.icoUrl;
  }

  getSubscriptionNumber() {
    return this.SubscriptionNumber;
  }

  getClassification() {
    return this.classification;
  }

  getHasSubscription() {
    return this.hasSubscription;
  }

  setHasSubscription(hasSubscription) {
    this.hasSubscription = hasSubscription;
  }
}