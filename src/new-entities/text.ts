import { Entity } from "./entity";
import { Positionable } from "../components/positionable";
import { Vector2 } from "../utilities/vectors";
import { TextRenderable } from "../components/text-renderable";

/**
 * Hero
 */
export interface CreateTextParam {
  ctx: CanvasRenderingContext2D;
  position: Vector2;
  text: string;
}

export const createText = ({
  ctx,
  position,
  text
}: CreateTextParam): Entity => {
  const positionable = new Positionable(position, 25, 50, 33, [0, 0]);
  return new Entity(new TextRenderable(ctx, positionable, text));
};
