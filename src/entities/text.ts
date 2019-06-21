import { Vector2 } from '../vectors.js';
import { GameObject, Drawable } from './base-classes.js';
import { GameContext } from '../states/context.js';

export class ScreenText extends GameObject implements Drawable {
  public position: Vector2 = [200, 200];

  private linesOfText: string[];
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
    // super({ width: 0, height: 0, xPos: originalXValue, yPos: originalYValue }); // HACK!!! this was empty, typescript made me fill it in!
    super();
    this.linesOfText = linesOfText;
    this.position = position;
    this.textAlignment = textAlignment;
    // this.originalXValue = originalXValue;
    // this.originalYValue = originalYValue;
    this.textStyle = textStyle;
    this.fontColor = fontColor;
  }

  // HEART of problems! Need stratagey to sort this
  public update(context: GameContext): void {
    // this.linesOfText = state.characters.screenText[0].linesOfText;
    // this.linesOfText = context.entities.screenText[0].linesOfText; // what is going on?
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    this.styleText(ctx);
    this.drawLinesOfText(ctx);
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
}
