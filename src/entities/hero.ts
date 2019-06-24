import { Vector2, vectors } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';
import { GameContext } from '../states/context.js';
import { instantiate } from './entity-factory.js';
import { Bullet } from './bullet.js';
import { Zombie } from './zombie.js';

export class Hero extends VectorCharacter {
  public lives = 3;
  public widthHeight: Vector2 = [25, 50];
  public color = 'red';
  public firePaused = false;
  public numberOfBullets = 100;

  public constructor(public position: Vector2) {
    super();
  }

  public updatePosition(context: GameContext): void {
    // console.log('kk');

    type Entity = Hero | Zombie | Bullet;

    function centerOfEntityScreenPosition(entity: Entity): Vector2 {
      return vectors.add(
        entity.position,
        vectors.divide(vectors.add(entity.widthHeight, [6, 25]), [2, 2]),
      );
    }

    if (context.inGameKeys.rightPressed) {
      this.rotation = this.rotation + 1;
    } else if (context.inGameKeys.leftPressed) {
      this.rotation = this.rotation - 1;
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
