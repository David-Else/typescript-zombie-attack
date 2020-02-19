import { ScreenText } from "../entities/text";
import { Base } from "./base-class";
import { GlobalState, InGameKeys, StatePattern } from "./global-state";
import { LevelOne } from "./level-one";

export class StartScreen extends Base implements StatePattern {
  public constructor(globalState: GlobalState) {
    super();
    globalState.entities.screenText = [
      new ScreenText({
        ctx: globalState.ctx,
        text: "Welcome\nTo\nZombie Game\ns to start\np to pause",
        position: [
          globalState.ctx.canvas.width / 2,
          globalState.ctx.canvas.height / 2
        ],
        textColor: "red",
        font: "Helvetica Neue",
        fontSize: 80
      })
    ];
  }

  public transition(context: GlobalState): void {
    context.State = new LevelOne(context);
  }

  public keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void {
    if (event.code === "KeyS") {
      inGameKeys.startPressed = event.type === "keydown";
    }
  }

  public update(context: GlobalState): void {
    context.entities.screenText[0].draw(context.ctx);

    if (context.inGameKeys.startPressed) {
      context.inGameKeys.startPressed = false;
      context.transition();
    }
  }
}
