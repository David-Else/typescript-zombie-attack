import { Vector2 } from "../utilities/vectors";
import { Positionable } from "../components/positionable";
import { RectangleRenderable } from "../components/rectangle-renderable";
import { Entity } from "./entity";

/**
 * Bullet
 */
interface CreateBulletParam {
  ctx: CanvasRenderingContext2D;
  position: Vector2;
}

export const createBullet = ({ ctx, position }: CreateBulletParam): Entity => {
  const width = 5;
  const height = 10;
  const rotation = 33;
  const positionable = new Positionable(position, width, height, rotation, [
    0,
    0
  ]);
  return new Entity(new RectangleRenderable(ctx, "black", positionable));
};
