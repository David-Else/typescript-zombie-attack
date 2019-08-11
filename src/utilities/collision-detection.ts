import { Entity } from '../entities/hero.js';
import { GameContext } from '../states/context.js';
import { LevelOne } from '../states/level-one.js';
import { Vector2 } from './vectors.js';

/**
 * =============================================================================
 * Axis-aligned bounding boxes, test if two game entities are overlapping or not
 * =============================================================================
 */
export interface Collidable {
  x: number;
  y: number;
  widthHeight: Vector2;
}

export function checkCollision(
  character1: Collidable,
  character2: Collidable,
): boolean {
  const left = character1.x;
  const right = character1.x + character1.widthHeight[0];
  const top = character1.y;
  const bottom = character1.y + character1.widthHeight[1];

  const otherLeft = character2.x;
  const otherRight = character2.x + character2.widthHeight[0];
  const otherTop = character2.y;
  const otherBottom = character2.y + character2.widthHeight[1];

  return !(
    left > otherRight ||
    right <= otherLeft ||
    top >= otherBottom ||
    bottom <= otherTop
  );
}

/**
 * =============================================================================
 * Test pairs of arrays of entities for collision to prevent unnessesary checks
 * =============================================================================
 */
function actOnCollision(
  context: GameContext,
  entityOne: Entity,
  entityTwo: Entity,
  index: number,
  indexTwo: number,
): void {
  switch (entityOne.kind) {
    case 'hero':
      switch (entityTwo.kind) {
        case 'zombie':
          // hero killed by zombie, loose life, start level again
          context.entities.hero.lives -= 1;
          // massive zombie spawn bug!
          context.State = new LevelOne(context);
          break;
        default:
          break;
      }
      break;
    case 'zombie':
      switch (entityTwo.kind) {
        case 'bullet':
          // zombie hit by bullet, delete zombie and bullet
          context.entities.zombies.splice(index, 1);
          context.entities.bullets.splice(indexTwo, 1);
          break;
        default:
          break;
      }
      break;
    case 'grave':
      switch (entityTwo.kind) {
        case 'bullet':
          // zombie hit by bullet, delete zombie and bullet
          context.entities.graves.splice(index, 1);
          context.entities.bullets.splice(indexTwo, 1);
          break;
        default:
          break;
      }
    default:
      break;
  }
}

export function detectAndActOnCollisions(context: GameContext): void {
  // this needs to go in global state so can ve updateable at run time
  // how about destructuring these to heros, zombies graves
  // how could this be
  const entityPairsForCollisionDetections = new Map<Entity[], Entity[]>()
    .set([context.entities.hero], context.entities.zombies)
    .set(context.entities.zombies, context.entities.bullets)
    .set(context.entities.graves, context.entities.bullets);

  for (const [key, value] of entityPairsForCollisionDetections) {
    key.forEach((entityOne, index) =>
      value.forEach((entityTwo, indexTwo) => {
        if (checkCollision(entityOne, entityTwo)) {
          actOnCollision(context, entityOne, entityTwo, index, indexTwo);
        }
      }),
    );
  }
}
