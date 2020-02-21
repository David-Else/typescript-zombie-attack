import { Entity } from "./entity";
import { Positionable } from "../components/positionable";
import { RectangleRenderable } from "../components/rectangle-renderable";
import { KeyboardInputable } from "../components/keyboard-inputable";
import { Vector2 } from "../utilities/vectors";

/**
 * Hero
 */
export interface CreateHeroParam {
  ctx: CanvasRenderingContext2D;
  position: Vector2;
}

export const createHero = ({ ctx, position }: CreateHeroParam): Entity => {
  const positionable = new Positionable(position, 25, 50, 33, [0, 0]);
  return new Entity(
    new RectangleRenderable(ctx, "red", positionable),
    new KeyboardInputable(positionable)
  );
};

// export class Hero {
//   constructor({ ctx, position }: CreateHeroParam) {
//     const positionable = new Positionable(position, 25, 50, 33, [0, 0]);
//     this.y = new Entity(
//       new RectangleRenderable(ctx, "red", positionable),
//       new KeyboardInputable(positionable)
//     );
//   }
// }

// const ctx = {};
// const hero = createHero({ ctx, position: [100, 20] });
// const x = new Hero({ ctx, position: [100, 20] });
// console.log(`this is a hero ${JSON.stringify(hero, null, 2)}`) //?
// x.y; //?
