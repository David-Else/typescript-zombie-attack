import { EntityBaseClass } from './base-class.js';
export class ScreenText extends EntityBaseClass {
    constructor({ ctx, text, position, textAlignment = 'center', textColor = 'black', rotation = 0, font = "'serif'", fontSize = 16, }) {
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
    updatePosition(context) {
        // do nothing, it does not move
    }
    draw(ctx) {
        const linesOfText = this.text.split('\n');
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlignment;
        ctx.translate(this.position[0], this.position[1]);
        ctx.rotate((this.rotation * Math.PI) / 180);
        linesOfText.forEach((line, index) => ctx.fillText(line, 0, index * this.fontSize));
        ctx.restore();
    }
}
//# sourceMappingURL=text.js.map