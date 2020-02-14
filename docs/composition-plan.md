https://gameprogrammingpatterns.com/component.html

DOMANINS are possibly AI, physics, rendering, sound different domains in a
program should be kept isolated from each other

we want different components! PhysicsComponent,InputComponent, GraphicsComponent
In practice, the components will need to have some interaction between
themselves. For example, the AI component may need to tell the physics component
where Bjørn is trying to go. However, we can restrict this to the components
that do need to talk instead of just tossing them all in the same playpen
together. Decorations are things in the world the player sees but doesn’t
interact with: bushes, debris and other visual detail. Props are like
decorations but can be touched: boxes, boulders, and trees. Zones are the
opposite of decorations — invisible but interactive. They’re useful for things
like triggering a cutscene when Bjørn enters an area.

EntityBaseClass Character is a EntityBaseClass

Screentext is a entitybaseclass

bitmapCharacter is a Character vectorCharacter is a Character

bullet is a VectorCharacter graves is a VectorCharecter hero is a vectorCharcetr

zombie is a bitmapcharacter

---

hero has a updateposition() hero has a draw() zombie has a updateposition()
zombie has a draw() bullet has a updateposition() bullet has a draw() bullet has
a fireBullet()

interface Entity { updateposition() draw() get x(): number get y(): number

    rotation:number ;
    position: Vector2;
    kind:string;

public readonly widthHeight: Vector2 = [25, 50];

public lives = 3;

    public readonly kind = 'bullet';

public readonly color = 'black';

public readonly widthHeight: Vector2 = [6, 25]; public readonly velocity:
Vector2 = [2, -2];

// Add smoothstep public readonly totalFrames = 120; public frameCounter = 0;
public tweenVelocity: Vector2 = [0, 0];

    public static readonly imagesToLoad: HTMLImageElement[] = [];

public readonly kind = 'zombie'; public readonly widthHeight: Vector2;

}

Interface BitmapEntity extends Entity { image: HTMLImageElement; widthHeight:
Vector2; ?? make this automatically in constructor?

}

Interface VectoryEntity extends Entity{ public readonly color = 'red';

}

Interface Bullet extends Entity { public firePaused = false; ? public
numberOfBullets = 100; }

Interface Zombie extends Entity { directTowards() }

Interface Hero extends Entity { fireBullet() directTowards() ?? to launch the
bullet? MODIFY?!

}

interface Text extends Entity { readonly ctx: CanvasRenderingContext2D; readonly
text: string; readonly position: Vector2; readonly textAlignment?:
CanvasTextAlign; readonly textColor?: string; readonly rotation?: number;
readonly font?: string; readonly fontSize?: number; }

componant classes

drawVector drawBitmap
