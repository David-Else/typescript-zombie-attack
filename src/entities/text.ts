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
  public textAlignment?: CanvasTextAlign;
  public textColor?: string;
  // public rotation?: number;
  public font?: string;
  public fontSize?: number;

  public constructor({
    ctx,
    text,
    position,
    textAlignment = 'center',
    textColor,
    rotation,
    font,
    fontSize,
  }: Text) {
    super();
    this.ctx = ctx;
    this.text = text;
    this.position = position;
    this.textAlignment = textAlignment;
    this.textColor = textColor;
    // this.rotation = rotation;
    this.font = font;
    this.fontSize = fontSize;
  }

  public updatePosition(context: GlobalState): void {
    // do nothing, it does not move
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.drawString({
      ctx,
      text: this.text,
      position: this.position,
      textColor: this.textColor,
      font: this.font,
      fontSize: this.fontSize,
    });
    // this.drawString({
    //   ctx,
    //   text: 's to start\np to pause',
    //   posX: ctx.canvas.width / 2,
    //   posY: ctx.canvas.height / 2 + 250,
    //   textColor: 'green',
    //   fontSize: 48,
    // });
  }

  public drawString({
    ctx,
    text,
    position,
    textAlignment = 'center',
    textColor: fillStyle = '#000000',
    rotation = 0,
    font = "'serif'",
    fontSize = 16,
  }: Text): void {
    const linesOfText = text.split('\n');
    ctx.save();
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = textAlignment;
    ctx.translate(position[0], position[1]);
    ctx.rotate((rotation * Math.PI) / 180);
    linesOfText.forEach((line, index) =>
      ctx.fillText(line, 0, index * fontSize),
    );
    ctx.restore();
  }
}
