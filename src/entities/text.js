import { EntityBaseClass } from './base-class.js';
export class ScreenText extends EntityBaseClass {
    constructor({ ctx, text, position, textAlignment = 'center', textColor, rotation, font, fontSize, }) {
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
    updatePosition(context) {
        // do nothing, it does not move
    }
    draw(ctx) {
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
    drawString({ ctx, text, position, textAlignment = 'center', textColor: fillStyle = '#000000', rotation = 0, font = "'serif'", fontSize = 16, }) {
        const linesOfText = text.split('\n');
        ctx.save();
        ctx.font = `${fontSize}px ${font}`;
        ctx.fillStyle = fillStyle;
        ctx.textAlign = textAlignment;
        ctx.translate(position[0], position[1]);
        ctx.rotate((rotation * Math.PI) / 180);
        linesOfText.forEach((line, index) => ctx.fillText(line, 0, index * fontSize));
        ctx.restore();
    }
}
//# sourceMappingURL=text.js.map