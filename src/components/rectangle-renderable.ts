import { Delegate } from "../new-entities/entity";
import { Positionable } from "./positionable";

export class RectangleRenderable implements Delegate {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private readonly fill: string,
    private readonly positionable: Positionable
  ) {}
  public update(): void {
    const { position, width, height, rotation } = this.positionable;
    // first save the untranslated/unrotated context
    this.ctx.save();
    this.ctx.beginPath();
    // move the rotation point to the center of the rect
    this.ctx.translate(position[0] + width / 2, position[1] + height / 2);
    // rotate the rect
    this.ctx.rotate(rotation * (Math.PI / 180));
    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    this.ctx.fillStyle = this.fill;
    this.ctx.fillRect(width / -2, height / -2, width, height);
    // restore the context to its untranslated/unrotated state
    this.ctx.restore();
  }
}
