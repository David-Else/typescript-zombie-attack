import { Vector2 } from "../utilities/vectors";
import { Entity } from "./entity";
import { Positionable } from "../components/positionable";
import { BitmapRenderable } from "../components/bitmap-renderable";
import { DirectTowardsable } from "../components/direct-towardsable";

/**
 * Zombie
 */
interface CreateZombieParam {
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  position: Vector2;
}

export const createZombie = ({
  ctx,
  image,
  position
}: CreateZombieParam): Entity => {
  const width = 10;
  const height = 10;
  const rotation = 0;
  const positionable = new Positionable(position, width, height, rotation, [
    0,
    0
  ]);
  return new Entity(
    new BitmapRenderable(ctx, image, positionable),
    new DirectTowardsable([500, 500], 1, positionable)
  );
};
