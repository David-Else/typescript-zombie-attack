import { VectorCharacter } from './vector-character.js';
export class Grave extends VectorCharacter {
    constructor(position) {
        super();
        this.position = position;
        this.kind = 'grave';
        this.lives = 3;
        this.widthHeight = [125, 50];
        this.color = 'grey';
    }
}
//# sourceMappingURL=graves.js.map