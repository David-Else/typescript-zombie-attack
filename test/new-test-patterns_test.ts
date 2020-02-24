/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { assertEquals, assert } from "../deps.ts";
import { PubSub } from "../src/EventObserver.ts";

/**
 * SUBSCRIBE UNSUBSCRIBE
 */
Deno.test({
  name: "SUBSCRIBE",
  fn(): void {
    // Arrange
    const observer = new PubSub();
    const fn = () => {};

    // Act
    observer.subscribe(fn);

    // Assert
    assertEquals(observer.handlers.size, 1);
  }
});

/**
 * SUBSCRIBE UNSUBSCRIBE
 */
Deno.test({
  name: "UNSUBSCRIBE",
  fn(): void {
    // Arrange
    const observer = new PubSub();
    const fn = () => {};
    observer.subscribe(fn);

    // Act
    observer.unsubscribe(fn);

    // Assert
    assertEquals(observer.handlers.size, 0);
  }
});

/**
 * BROADCAST
 */
Deno.test({
  name: "BROADCAST",
  fn(): void {
    // Arrange
    const observer = new PubSub();
    let subscriberHasBeenCalled = false;
    // eslint-disable-next-line no-return-assign
    const fn = (data: any) => (subscriberHasBeenCalled = data);
    observer.subscribe(fn);

    // Act
    observer.emit(true);

    // Assert
    assert(subscriberHasBeenCalled);
  }
});
