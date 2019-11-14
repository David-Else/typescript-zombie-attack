import { LevelOne } from '../states/level-one.js';
/**
 * =============================================================================
 * Axis-aligned bounding boxes, test if two game entities are overlapping or not
 * =============================================================================
 */
export function checkCollision(character1, character2) {
    const left = character1.x;
    const right = character1.x + character1.widthHeight[0];
    const top = character1.y;
    const bottom = character1.y + character1.widthHeight[1];
    const otherLeft = character2.x;
    const otherRight = character2.x + character2.widthHeight[0];
    const otherTop = character2.y;
    const otherBottom = character2.y + character2.widthHeight[1];
    return !(left > otherRight ||
        right <= otherLeft ||
        top >= otherBottom ||
        bottom <= otherTop);
}
/**
 * =============================================================================
 * Check each entity in a group against entities in the other group
 * =============================================================================
 */
const checkIfGroupsColliding = (entitiesGroupOne, entitiesGroupTwo, collisionHandler) => {
    entitiesGroupOne.forEach((entity, indexOne) => entitiesGroupTwo.forEach((entityTwo, indexTwo) => {
        if (checkCollision(entity, entityTwo)) {
            collisionHandler(indexOne, indexTwo);
        }
    }));
};
/**
 * =============================================================================
 * Define collision handling functions and compare groups against other groups
 * (this approach is done to avoid comparing everything and wasting CPU)
 * =============================================================================
 */
export function detectAndActOnCollisions4(context) {
    const heroZombieCollisionHandler = () => {
        context.entities.hero.lives -= 1;
        context.State = new LevelOne(context);
    };
    const zombieBulletCollisionHandler = (index, indexTwo) => {
        context.entities.zombies.splice(index, 1);
        context.entities.bullets.splice(indexTwo, 1);
    };
    const graveBulletCollisionHandler = (index, indexTwo) => {
        context.entities.graves.splice(index, 1);
        context.entities.bullets.splice(indexTwo, 1);
    };
    const groupsToCheck = [
        [
            [context.entities.hero],
            context.entities.zombies,
            heroZombieCollisionHandler,
        ],
        [
            context.entities.zombies,
            context.entities.bullets,
            zombieBulletCollisionHandler,
        ],
        [
            context.entities.graves,
            context.entities.bullets,
            graveBulletCollisionHandler,
        ],
    ];
    groupsToCheck.forEach(groupParams => checkIfGroupsColliding(...groupParams));
    // checkIfGroupsColliding(
    //   [context.entities.hero],
    //   context.entities.zombies,
    //   heroZombieCollisionHandler,
    // );
    // checkIfGroupsColliding(
    //   context.entities.zombies,
    //   context.entities.bullets,
    //   zombieBulletCollisionHandler,
    // );
    // checkIfGroupsColliding(
    //   context.entities.graves,
    //   context.entities.bullets,
    //   graveBulletCollisionHandler,
    // );
}
//# sourceMappingURL=collision-detection.js.map