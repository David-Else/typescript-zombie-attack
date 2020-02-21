import { Positionable } from "./positionable";
import { Delegate } from "../new-entities/entity";

export class BitmapRenderable implements Delegate {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly image: HTMLImageElement,
    private readonly positionable: Positionable
  ) {}
  public update(): void {
    const { position } = this.positionable;
    this.ctx.drawImage(this.image, position[0], position[1]);
  }
}
