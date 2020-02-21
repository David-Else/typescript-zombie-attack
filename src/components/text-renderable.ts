import { Delegate } from "../new-entities/entity";
import { Positionable } from "./positionable";

export class TextRenderable implements Delegate {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private readonly positionable: Positionable,
    private readonly text: string,
    private readonly textAlignment = "center" as CanvasTextAlign,
    private readonly fillStyle = "black",
    private readonly rotation = 0,
    private readonly font = "'serif'",
    private readonly fontSize = 16
  ) {}
  public update(): void {
    const { position } = this.positionable;
    const linesOfText = this.text.split("\n");
    this.ctx.save();
    this.ctx.font = `${this.fontSize}px ${this.font}`;
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.textAlign = this.textAlignment;
    this.ctx.translate(position[0], position[1]);
    this.ctx.rotate((this.rotation * Math.PI) / 180);
    linesOfText.forEach((line: any, index: any) =>
      this.ctx.fillText(line, 0, index * this.fontSize)
    );
    this.ctx.restore();
  }
}
