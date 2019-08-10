import { EntityBaseClass } from './base-class';
export class ScreenText extends EntityBaseClass {
    //   public originalXValue: number = 100;
    //   public originalYValue: number = 100;
    constructor(linesOfText, textStyle, fontColor, position, textAlignment = 'center') {
        // super({ width: 0, height: 0, xPos: originalXValue, yPos: originalYValue }); // HACK!!! this was empty, typescript made me fill it in!
        super();
        this.position = [200, 200];
        this.styleText = (ctx) => {
            ctx.textAlign = this.textAlignment;
            ctx.font = this.textStyle;
            ctx.fillStyle = this.fontColor;
        };
        this.drawLinesOfText = (ctx) => {
            const lineHeight = ctx.measureText('M').width * 1.2;
            let yStartPosition = this.y;
            this.linesOfText.forEach(lineOfText => {
                ctx.fillText(lineOfText, this.x, yStartPosition);
                yStartPosition += lineHeight;
            });
        };
        this.linesOfText = linesOfText;
        this.position = position;
        this.textAlignment = textAlignment;
        // this.originalXValue = originalXValue;
        // this.originalYValue = originalYValue;
        this.textStyle = textStyle;
        this.fontColor = fontColor;
    }
    updatePosition(context) {
        // do nothing, it does not move
    }
    draw(ctx) {
        this.styleText(ctx);
        this.drawLinesOfText(ctx);
    }
}
//# sourceMappingURL=text.js.map