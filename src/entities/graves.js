import { VectorCharacter } from './vector-character.js';
export class Grave extends VectorCharacter {
    constructor(position) {
        super();
        this.position = position;
        this.kind = 'grave';
        this.widthHeight = [125, 50];
        this.color = 'grey';
        this.lives = 3;
    }
}
//# sourceMappingURL=graves.js.map