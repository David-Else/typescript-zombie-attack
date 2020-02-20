// https://www.sitepoint.com/javascript-design-patterns-observer-pattern/
// You need a way to update parts of a page in response to events, with the data these provide.
export interface EO {
  subscribe(fn: any): void;
  unsubscribe(fn: any): void;
  broadcast(data: any): void;
}

export class EventObserver implements EO {
  constructor(public observers = [] as any) {} // make it private after test

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
