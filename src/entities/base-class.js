/**
 * =============================================================================
 * Top level abstract class all others inherit from
 * =============================================================================
 */
export class EntityBaseClass {
    constructor() {
        this.rotation = 0;
        this.scale = [0, 0];
        this.position = [0, 0];
    }
    get x() {
        return this.position[0];
    }
    get y() {
        return this.position[1];
    }
}
//# sourceMappingURL=base-class.js.map