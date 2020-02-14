import { entityFactory } from "../entities/factory.js";
import { Grave } from "../entities/graves.js";
import { Hero } from "../entities/hero.js";
import { ScreenText } from "../entities/text.js";
import { Zombie } from "../entities/zombie.js";
import { Vector2 } from "../utilities/vectors.js";
import { Base } from "./base-class.js";
import { GlobalState, StatePattern } from "./global-state.js";
import { LevelTwo } from "./level-two.js";

export class LevelOne extends Base implements StatePattern {
  public constructor(globalState: GlobalState) {
    super();
    const numberOfZombies = 50;

    globalState.entities.screenText = [
      new ScreenText({
        ctx: globalState.ctx,
        text: "",
        position: [100, 50],
        textAlignment: "left",
        textColor: "black",
        font: "Helvetica Neue",
        fontSize: 24
      })
    ];

    // if the hero does not exist, or has live === 0,  make him

    if (!globalState.entities.hero.lives) {
      const heroObject = entityFactory(Hero, 1, [
        globalState.ctx.canvas.width / 2,
        globalState.ctx.canvas.height / 2
      ]);
      globalState.entities.hero = heroObject[0];
      // globalState.entities.hero = entityFactory(Hero, 1, [
      //   globalState.ctx.canvas.width / 2,
      //   globalState.ctx.canvas.height / 2,
      // ]); /// NIGHTMARE HACK!!!! FIX
    }

    globalState.entities.zombies = []; // stop megaspawn, kill remaining zombies if restart level
    globalState.entities.zombies.push(
      ...entityFactory(Zombie, numberOfZombies, Zombie.imagesToLoad[0], [
        globalState.ctx.canvas.width / 2,
        globalState.ctx.canvas.height / 2
      ])
    );

    const gravesPos: Vector2 | null | undefined =
      globalState.gameData.level1.graves[0].position;

    // there is ERROR here, delete it and it thinks it not assignable
    // like the other weird error!
    if (gravesPos) {
      globalState.entities.graves.push(...entityFactory(Grave, 1, gravesPos));
    }
  }

  public transition(context: GlobalState): void {
    console.log("context.State = new Level 2;");
    context.State = new LevelTwo(context);
  }

  public update(context: GlobalState): void {
    super.update(context);
    if (context.entities.hero.lives === 3) {
      // console.log(context.entities.hero.lives);
      // why does this just keep running?!
      //   context.State = new GameOver(context);
    }
    context.entities.screenText[0].text = `Level 1\nLives = ${context.entities.hero.lives}\nScore = ${context.score}\nZombies = ${context.entities.zombies.length}\nBullets = ${context.entities.hero.numberOfBullets}`;
  }
}
