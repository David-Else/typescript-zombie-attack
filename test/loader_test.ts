import { assertEquals, assertThrowsAsync } from "../deps.ts";
// import { load } from "../src/utilities/loader.ts";

// Deno.test({
//   name: "example test",
//   fn(): void {
//     // Arrange
//     const expectedResult = 42;
//     // Act
//     const result = example();
//     // Assert
//     assertEquals(result, expectedResult);
//   }
// });

Deno.test(async function doesThrow(): Promise<void> {
  await assertThrowsAsync(
    async (): Promise<void> => {
      throw new TypeError("hello world!");
    }
  );
  await assertThrowsAsync(async (): Promise<void> => {
    throw new TypeError("hello world!");
  }, TypeError);
  await assertThrowsAsync(
    async (): Promise<void> => {
      throw new TypeError("hello world!");
    },
    TypeError,
    "hello"
  );
  await assertThrowsAsync(
    async (): Promise<void> => {
      return Promise.reject(new Error());
    }
  );
});
