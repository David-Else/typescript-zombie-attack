import { Entity, GlobalState } from '../states/global-state.js';
import { Vector2, vectors } from '../utilities/vectors.js';
import { Bullet } from './bullet.js';
import { entityFactory } from './factory.js';
// import { instantiate } from './factory.js';
import { VectorCharacter } from './vector-character.js';

export class Hero extends VectorCharacter {
  public readonly kind = 'hero';
  public readonly widthHeight: Vector2 = [25, 50];
  public readonly color = 'red';

  public lives = 3;
  public firePaused = false;
  public numberOfBullets = 100;

  public constructor(public position: Vector2) {
    super();
  }

  public updatePosition(context: GlobalState): void {
    function centerOfEntityScreenPosition(entity: Entity): Vector2 {
      const middleOfEntity = vectors.divide(entity.widthHeight, [2, 2]);
      return vectors.add(entity.position, middleOfEntity);
    }

    if (context.inGameKeys.rightPressed) {
      this.rotation += 1;
    }
    if (context.inGameKeys.leftPressed) {
      this.rotation -= 1;
    }

    if (!context.inGameKeys.firePressed) {
      this.firePaused = false;
    }

    if (
      context.inGameKeys.firePressed &&
      this.numberOfBullets > 0 &&
      !this.firePaused
    ) {
      //   context.inGameKeys.firePressed = false; WATCH OUT RACE BUG
      this.firePaused = true;

      context.entities.bullets.push(
        ...entityFactory(
          Bullet,
          1,
          centerOfEntityScreenPosition(this),
          this.rotation,
        ),
      );
      this.numberOfBullets -= 1;
    }
  }
}
