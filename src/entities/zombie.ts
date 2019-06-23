import { vectors, Vector2 } from '../vectors.js';
import { BitmapCharacter } from './base-classes.js';
import { GameContext } from '../states/context.js';

export class Zombie extends BitmapCharacter {
  public kind: 'zombie' | undefined;
  public widthHeight: Vector2;
  public image: HTMLImageElement;
  public position: Vector2;
  public constructor(image: HTMLImageElement, position: Vector2) {
    super();
    this.widthHeight = [image.width, image.height];
    this.image = image;
    this.position = position;
  }

  public updatePosition(context: GameContext): void {
    this.directTowards(context.entities.hero[0].position);
    this.randomStumble();
    super.updatePosition();
  }

  private randomStumble(): void {
    if (Math.random() >= 0.5) {
      if (Math.random() >= 0.5) {
        this.velocity = vectors.add(this.velocity, vectors.left);
      } else this.velocity = vectors.add(this.velocity, vectors.right);
    }
  }
}
