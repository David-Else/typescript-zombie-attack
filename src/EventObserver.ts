/* eslint-disable max-classes-per-file */
// https://www.sitepoint.com/javascript-design-patterns-observer-pattern/
// You need a way to update parts of a page in response to events, with the data these provide.

export class PubSub<T> {
  public readonly handlers: Set<(v: T) => void> = new Set(); // make private in production

  subscribe(fn: (event: T) => void): void {
    this.handlers.add(fn);
  }

  unsubscribe(fn: (event: T) => void): void {
    this.handlers.delete(fn);
  }

  emit(event: T): void {
    this.handlers.forEach(fn => fn(event));
  }
}

// @kouhin Array.from(mapOrSet, mapperFunction),Array.from(mapOrSet.keys(), mapperFunction), same for values/entries

// in other words, yes - convert it to an array.
