export class Pubsub {
  constructor() {
    this.topics = {};
    this.subCount = 0;
  }

  publish(topic, args) {
    if (!this.topics[topic]) {
      return;
    }
    const subscribers = this.topics[topic];
    subscribers.forEach(sub => {
      sub.callback(args);
    });
  }

  subscribe(topic, cb) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    const subid = `subscriber_${this.subCount++}`;
    this.topics[topic].push({
      subscriberId: subid,
      callback: cb,
    });
    return subid;
  }

  unsubscribe(subid) {
    const targets = [];
    Object.keys(this.topics).forEach(k => {
      this.topics[key].forEach((t, idx) => {
        if (t.subscriberId === subid) {
          targets.push({
            key: k,
            index: idx,
          });
        }
      });
    });
    targets.forEach(target => {
      this.topics[target.key].slice(target.index, 1);
    });
  }
}


