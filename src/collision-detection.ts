import { Vector2 } from './game-objects.js';

/**
 * =============================================================================
 * Axis-aligned bounding boxes, test if two game entities are overlapping or not
 * =============================================================================
 */
export function checkCollision(
  character1: { x: number; y: number; widthHeight: Vector2 },
  character2: { x: number; y: number; widthHeight: Vector2 },
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
