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
// add new stuff from https://www.youtube.com/watch?v=VpaTWhgYQEk
var CollidableTypes;
(function (CollidableTypes) {
    CollidableTypes[CollidableTypes["RECTANGLE"] = 0] = "RECTANGLE";
    CollidableTypes[CollidableTypes["ROTATEDRECTANGLE"] = 1] = "ROTATEDRECTANGLE";
})(CollidableTypes || (CollidableTypes = {}));
//# sourceMappingURL=collision-detection.js.map