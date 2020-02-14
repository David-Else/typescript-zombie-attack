import { ScreenText } from "../entities/text.js";
import { Base } from "./base-class.js";
import { GlobalState, StatePattern } from "./global-state.js";
import { Init } from "./init.js";

export class GameOver extends Base implements StatePattern {
  public constructor(globalState: GlobalState) {
    super();
    globalState.entities.screenText = [
      new ScreenText({
        ctx: globalState.ctx,
        text: "Game Over!",
        position: [
          globalState.ctx.canvas.width / 2,
          globalState.ctx.canvas.height / 2
        ],
        textColor: "black",
        font: "Helvetica Neue",
        fontSize: 80
      })
    ];
  }

  public transition(context: GlobalState): void {
    console.log("context.State = new Init();");
    context.State = new Init();
  }
}
