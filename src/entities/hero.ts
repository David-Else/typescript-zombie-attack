import { Vector2 } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';

export class Hero extends VectorCharacter {
  public kind: 'hero' | undefined;
  public lives = 3;
  public widthHeight: Vector2 = [25, 50];
  public color = 'red';
  public firePaused = false;
  //   public numberOfBullets = 100;

  public constructor(public position: Vector2) {
    super();
  }
  public update(state: any): void {
    if (state.keys.rightPressed) {
      this.rotation = this.rotation + 1;
    } else if (state.keys.leftPressed) {
      this.rotation = this.rotation - 1;
    }
    // firePaused is set to true after every bullet
    // only when the fire button is released is it set to false
    // this means only one bullet fired per button press
    if (!state.keys.firePressed) {
      this.firePaused = false;
    }
    if (
      state.keys.firePressed &&
      state.numberOfBullets > 0 &&
      !this.firePaused
    ) {
      state.numberOfBullets -= 1;
      console.log(`fire! ${state.numberOfBullets}`);
      state.events.fire.broadcast();
      this.firePaused = true;
    }

    super.update();
  }
  //   public createBullet(): void {

  //   }
}
