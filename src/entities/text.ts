import { GlobalState } from '../states/global-state.js';
import { Vector2 } from '../utilities/vectors.js';
import { Drawable, EntityBaseClass } from './base-class.js';

interface Text {
  ctx: CanvasRenderingContext2D;
  text: string;
  position: Vector2;
  textAlignment?: CanvasTextAlign;
  textColor?: string;
  rotation?: number;
  font?: string;
  fontSize?: number;
}

export class ScreenText extends EntityBaseClass implements Drawable {
  public ctx: CanvasRenderingContext2D;
  public text: string;
  public position: Vector2;
  public textAlignment: CanvasTextAlign;
  public fillStyle: string;
  public rotation: number;
  public font: string;
  public fontSize: number;

  public constructor({
    ctx,
    text,
    position,
    textAlignment = 'center',
    textColor = 'black',
    rotation = 0,
    font = "'serif'",
    fontSize = 16,
  }: Text) {
    super();
    this.ctx = ctx;
    this.text = text;
    this.position = position;
    this.textAlignment = textAlignment;
    this.fillStyle = textColor;
    this.rotation = rotation;
    this.font = font;
    this.fontSize = fontSize;
  }

  public updatePosition(context: GlobalState): void {
    // do nothing, it does not move
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const linesOfText = this.text.split('\n');
    ctx.save();
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.fillStyle = this.fillStyle;
    ctx.textAlign = this.textAlignment;
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate((this.rotation * Math.PI) / 180);
    linesOfText.forEach((line, index) =>
      ctx.fillText(line, 0, index * this.fontSize),
    );
    ctx.restore();
  }
}
