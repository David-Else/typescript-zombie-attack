import { strict as assert } from 'assert';
import { toFixedScreenRatio } from '../src/app.js';

describe('Example test', (): void => {
  describe('test()', (): void => {
    it('should return 3 when it has a passed parameter of 2', (): void => {
      // Arrange
      const testData = 2;
      console.log('hello');

      // Act
      const result = toFixedScreenRatio(
        window.innerWidth,
        window.innerHeight,
        4 / 3,
      );
      // Assert
      assert.strictEqual(result, 3);
    });
  });
});
