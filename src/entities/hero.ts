import { Entity, GlobalState } from '../states/global-state.js';
import { Vector2, vectors } from '../utilities/vectors.js';
import { Bullet } from './bullet.js';
import { instantiate } from './factory.js';
import { VectorCharacter } from './vector-character.js';

export class Hero extends VectorCharacter {
  public kind = 'hero';
  public lives = 3;
  public widthHeight: Vector2 = [25, 50];
  public color = 'red';
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
        ...instantiate(Bullet, 1, {
          position: centerOfEntityScreenPosition(this),
          rotation: this.rotation,
        }),
      );
      this.numberOfBullets -= 1;
    }
  }
}
