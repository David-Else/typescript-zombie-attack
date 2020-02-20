// https://www.sitepoint.com/javascript-design-patterns-observer-pattern/
export class EventObserver {
  constructor(public observers = [] as any) {}

  subscribe(fn: any) {
    this.observers.push(fn);
  }

  unsubscribe(fn: any) {
    this.observers = this.observers.filter(
      (subscriber: any) => subscriber !== fn
    );
  }

  broadcast(data: any) {
    this.observers.forEach((subscriber: any) => subscriber(data));
  }
}
