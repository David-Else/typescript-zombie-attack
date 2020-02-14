import { ScreenText } from "../entities/text.js";
import { Base } from "./base-class.js";
import { GlobalState, StatePattern } from "./global-state.js";
import { StartScreen } from "./start-screen.js";

export class LevelTwo extends Base implements StatePattern {
  public constructor(globalState: GlobalState) {
    super();
    globalState.entities.screenText = [
      new ScreenText({
        ctx: globalState.ctx,
        text: "",
        position: [100, 50],
        textColor: "red",
        font: "Helvetica Neue",
        fontSize: 24
      })
    ];

    // const middleOfScreen = (ctx: CanvasRenderingContext2D): Vector2 => [
    //   ctx.canvas.width / 2,
    //   ctx.canvas.height / 2,
    // ];

    // context.entities.hero = instantiate(Hero, 1, {
    //   position: middleOfScreen(context.ctx),
    // });

    // context.entities.zombies.push(
    //   ...instantiate(Zombie, 50, {
    //     image: Zombie.imagesToLoad[0],
    //     pointToSpawnAround: middleOfScreen(context.ctx),
    //   }),
    // );
  }

  public transition(context: GlobalState): void {
    console.log("context.State = new Init();");
    context.State = new StartScreen(context);
  }

  public update(context: GlobalState): void {
    super.update(context);
    context.entities.screenText[0].text = `Level 1\nLives = ${context.entities.hero.lives}\nScore = ${context.score}\nZombies = ${context.entities.zombies.length}\nBullets = ${context.entities.hero.numberOfBullets}`;
  }
}
