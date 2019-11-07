import { GlobalState } from '../states/global-state.js';
import { Vector2 } from '../utilities/vectors.js';
import { Drawable, EntityBaseClass } from './base-class.js';

export class ScreenText extends EntityBaseClass implements Drawable {
  public position: Vector2 = [200, 200];
  public widthHeight = [0, 0]; // hack to make it an entity, rethink

  public linesOfText: string[];
  private textStyle: string;
  private textAlignment: CanvasTextAlign;
  private fontColor: string;
  //   public originalXValue: number = 100;
  //   public originalYValue: number = 100;

  public constructor(
    linesOfText: string[],
    textStyle: string,
    fontColor: string,
    position: Vector2,
    textAlignment: CanvasTextAlign = 'center',
  ) {
    super();
    this.linesOfText = linesOfText;
    this.position = position;
    this.textAlignment = textAlignment;
    this.textStyle = textStyle;
    this.fontColor = fontColor;
  }

  public updatePosition(context: GlobalState): void {
    // do nothing, it does not move
  }

  // public draw(ctx: CanvasRenderingContext2D): void {
  //   this.styleText(ctx);
  //   this.drawLinesOfText(ctx);
  // }
  public draw(ctx: CanvasRenderingContext2D): void {
    // var nbc = document.getElementById('nb').getContext('2d');
    this.drawString({
      ctx,
      text: 'Welcome\nTo\nZombie Game',
      posX: ctx.canvas.width / 2,
      posY: ctx.canvas.height / 2,
      textColor: 'red',
      rotation: 0,
      font: 'Chalkduster',
      fontSize: 80,
    });
    this.drawString({
      ctx,
      text: "auf'm Kopf",
      posX: 500,
      posY: 100,
      textColor: '#363',
      rotation: 180,
      font: 'Chalkduster',
      fontSize: 24,
    });
    this.drawString({
      ctx,
      text: 'und alles mit HTML5 JS coool',
      posX: 600,
      posY: 450,
      textColor: '#a66',
      rotation: -30,
      font: 'Trebuchet MS',
      fontSize: 24,
    });
    this.drawString({
      ctx,
      text: 'nach unten',
      posX: 10,
      posY: 10,
      textColor: '#66a',
      rotation: 90,
      font: 'Trebuchet MS',
      fontSize: 24,
    });
    this.drawString({
      ctx,
      text: 'nach oben',
      posX: 27,
      posY: 590,
      textColor: '#66a',
      rotation: -90,
      font: 'sans-serif',
      fontSize: 24,
    });
  }

  public drawString({
    ctx,
    text,
    posX,
    posY,
    textAlignment = 'center',
    textColor = '#000000',
    rotation = 0,
    font = "'serif'",
    fontSize = 16,
  }: {
    ctx: CanvasRenderingContext2D;
    text: string;
    posX: number;
    posY: number;
    textAlignment?: CanvasTextAlign;
    textColor?: string;
    rotation?: number;
    font?: string;
    fontSize?: number;
  }): void {
    const lines = text.split('\n');
    ctx.save();
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlignment;
    ctx.translate(posX, posY);
    ctx.rotate((rotation * Math.PI) / 180);
    for (let i = 0; i < lines.length; i += 1) {
      ctx.fillText(lines[i], 0, i * fontSize);
    }
    ctx.restore();
  }

  private styleText = (ctx: CanvasRenderingContext2D): void => {
    ctx.textAlign = this.textAlignment;
    ctx.font = this.textStyle;
    ctx.fillStyle = this.fontColor;
  };

  private drawLinesOfText = (ctx: CanvasRenderingContext2D): void => {
    const lineHeight = ctx.measureText('M').width * 1.2;
    let yStartPosition = this.y;
    this.linesOfText.forEach(lineOfText => {
      ctx.fillText(lineOfText, this.x, yStartPosition);
      yStartPosition += lineHeight;
    });
  };
  // ERROR THIS IS DUMMY DOING nothing NEEDS TO UPDATE TEXT

  //

  /*
   * draw a multiline string rotated in a canvas
   *
   * @param ctx (M) context of the canvas
   * @param text (M) string may contain \n
   * @param posX (M) horizontal start position
   * @param posY (M) vertical start position
   * @param textColor color
   * @param rotation in degrees (by 360)
   * @param font must be installed on client use websafe
   * @param fonSize in Pixels
   *
   * all (M) params are mandatory - rest is optional
   */

  // ['Welcome', 'To', 'Zombie Game', "('s' to start)", "('p' to pause)"],
  // '80px Helvetica Neue',
  // 'red',
  // [350, 150], // make centrered
}
