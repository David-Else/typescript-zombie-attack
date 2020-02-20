import { assertEquals, assert } from "../deps.ts";
import { EventObserver } from "../src/EventObserver.ts";
/**
 * SUBSCRIBE UNSUBSCRIBE
 */
Deno.test({
  name: "SUBSCRIBE UNSUBSCRIBE",
  fn(): void {
    // Arrange
    const observer = new EventObserver();
    const fn = () => {};
    observer.subscribe(fn);

    // Act
    observer.unsubscribe(fn);

    // Assert
    assertEquals(observer.observers.length, 0);
  }
});

/**
 * BROADCAST
 */
Deno.test({
  name: "BROADCAST",
  fn(): void {
    // Arrange
    const observer = new EventObserver();
    let subscriberHasBeenCalled = false;
    const fn = data => (subscriberHasBeenCalled = data);
    observer.subscribe(fn);

    // Act
    observer.broadcast(true);

    // Assert
    assert(subscriberHasBeenCalled);
  }
});
