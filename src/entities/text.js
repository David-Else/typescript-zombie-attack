import { EntityBaseClass } from './base-class.js';
export class ScreenText extends EntityBaseClass {
    //   public originalXValue: number = 100;
    //   public originalYValue: number = 100;
    constructor(linesOfText, textStyle, fontColor, position, textAlignment = 'center') {
        super();
        this.position = [200, 200];
        this.widthHeight = [0, 0]; // hack to make it an entity, rethink
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
        this.textStyle = textStyle;
        this.fontColor = fontColor;
    }
    updatePosition(context) {
        // do nothing, it does not move
    }
    // public draw(ctx: CanvasRenderingContext2D): void {
    //   this.styleText(ctx);
    //   this.drawLinesOfText(ctx);
    // }
    draw(ctx) {
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
    drawString({ ctx, text, posX, posY, textAlignment = 'center', textColor = '#000000', rotation = 0, font = "'serif'", fontSize = 16, }) {
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
}
//# sourceMappingURL=text.js.map