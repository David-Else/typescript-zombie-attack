import { GlobalState } from '../states/global-state.js';
import { random } from '../utilities/random.js';
import { Vector2, vectors } from '../utilities/vectors.js';
import { BitmapCharacter } from './bitmap-character.js';

export class Zombie extends BitmapCharacter {
  public static readonly imagesToLoad: HTMLImageElement[] = [];
  public readonly kind = 'zombie';
  public readonly widthHeight: Vector2;
  public readonly image: HTMLImageElement;

  public position: Vector2;

  public constructor(image: HTMLImageElement, positionToSpawnAround: Vector2) {
    super();
    this.widthHeight = [image.width, image.height];
    this.image = image;
    this.position = random.positionAroundPoint(positionToSpawnAround);
  }

  public updatePosition(context: GlobalState): void {
    const slowDownFactor: Vector2 = [0.1, 0.1];

    this.directTowards(context.entities.hero.position);
    // this.randomStumble();
    this.position = vectors.add(
      this.position,
      vectors.multiply(this.velocity, slowDownFactor),
    );
  }
  // doesn't do much!
  // private randomStumble(): void {
  //   if (Math.random() >= 0.5) {
  //     if (Math.random() >= 0.5) {
  //       this.velocity = vectors.add(this.velocity, vectors.left);
  //     } else this.velocity = vectors.add(this.velocity, vectors.right);
  //   }
  // }
}
