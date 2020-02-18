import { Vector2, vectors } from "./utilities/vectors.js";
import { velocityTowards } from "./utilities/velocity-towards.js";
import { World } from "./world.js";

interface EntityComponentCtor {
  new (): any;
}

/**
 * ============================================================================
 * Input componentss
 * ============================================================================
 */
interface EntityInputComponent {
  update(entity: GameObject, world: World): void;
}

export const HeroInputComponent: EntityComponentCtor = class HeroInputComponent
  implements EntityInputComponent {
  private firePaused = false;
  private keysPressed = {
    fire: false,
    left: false,
    right: false,
    pause: false
  };

  constructor() {
    document.addEventListener("keydown", this.keyHandler);
    document.addEventListener("keyup", this.keyHandler);
  }

  update(hero: GameObject, world: World): void {
    if (this.keysPressed.right) {
      hero.rotation += 1;
    }
    if (this.keysPressed.left) {
      hero.rotation -= 1;
    }
    // if fire is not pressed then un-pause the firing
    if (!this.keysPressed.fire) {
      this.firePaused = false;
    }

    if (
      this.keysPressed.fire &&
      world.numberOfBullets > 0 &&
      !this.firePaused
    ) {
      // pause the firing until the fire key is released
      this.firePaused = true;
      world.entityFactory(GameObject, "bullets", 1, {
        startPosition: () => world.entities.hero[0].position,
        startVelocity: [0, 0],
        startRotation: world.entities.hero[0].rotation,
        Physics: BulletPhysicsComponent,
        Graphics: BulletGraphicsComponent
      });
    }
  }

  private readonly keyHandler = (event: KeyboardEvent): void => {
    switch (event.code) {
      case "KeyF":
        this.keysPressed.fire = event.type === "keydown";
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.keysPressed.left = event.type === "keydown";
        break;
      case "ArrowRight":
        event.preventDefault();
        this.keysPressed.right = event.type === "keydown";
        break;
      case "KeyP":
        if (event.type === "keydown" && !event.repeat) {
          this.keysPressed.pause = !this.keysPressed.pause;
        }
        break;
    }
  };
};

/**
 * ============================================================================
 * Physics components
 * ============================================================================
 */
interface EntityPhysicsComponent {
  update(entity: GameObject, world: World): void;
}

export const HeroPhysicsComponent: EntityComponentCtor = class HeroPhysicsComponent
  implements EntityPhysicsComponent {
  update(hero: GameObject, world: World): void {
    hero.position = vectors.add(hero.position, hero.velocity);
  }
};

export const ZombiePhysicsComponent: EntityComponentCtor = class ZombiePhysicsComponent
  implements EntityPhysicsComponent {
  update(zombie: GameObject, world: World): void {
    zombie.velocity = velocityTowards(
      zombie.position,
      world.entities.hero[0].position,
      1
    );
    zombie.position = vectors.add(zombie.position, zombie.velocity);
  }
};

export const BulletPhysicsComponent: EntityComponentCtor = class BulletPhysicsComponent
  implements EntityPhysicsComponent {
  update(bullet: GameObject, world: World): void {
    bullet.position = vectors.add(bullet.position, [
      Math.sin(bullet.rotation * (Math.PI / 180)) + bullet.velocity[0],
      Math.cos(bullet.rotation * (Math.PI / 180)) + bullet.velocity[1]
    ]);
  }
};

/**
 * ============================================================================
 * Graphics components
 * ============================================================================
 */
interface EntityGraphicsComponent {
  update(entity: GameObject, ctx: CanvasRenderingContext2D): void;
}

interface RenderComponent {
  render(entity: GameObject, ctx: CanvasRenderingContext2D, parent: any): void;
}

class VectorRenderComponent implements RenderComponent {
  render(entity: GameObject, ctx: CanvasRenderingContext2D, parent: any): void {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = parent.color;
    ctx.translate(entity.x + parent.width / 2, entity.y + parent.height / 2);
    ctx.rotate(entity.rotation * (Math.PI / 180));
    ctx.fillRect(
      parent.width / -2,
      parent.height / -2,
      parent.width,
      parent.height
    );
    ctx.restore();
  }
}

export const HeroGraphicsComponent: EntityComponentCtor = class HeroGraphicsComponent
  implements EntityGraphicsComponent {
  private readonly width = 25;
  private readonly height = 55;
  private readonly color = "red";
  public render: VectorRenderComponent;

  constructor() {
    this.render = new VectorRenderComponent();
  }

  update(hero: GameObject, ctx: CanvasRenderingContext2D): void {
    this.render.render(hero, ctx, this);
  }
};

export const ZombieGraphicsComponent: EntityComponentCtor = class ZombieGraphicsComponent
  implements EntityGraphicsComponent {
  private readonly width = 15;
  private readonly height = 5;
  private readonly color = "green";
  public render: VectorRenderComponent;

  constructor() {
    this.render = new VectorRenderComponent();
  }

  update(zombie: GameObject, ctx: CanvasRenderingContext2D): void {
    this.render.render(zombie, ctx, this);
  }
};

export const BulletGraphicsComponent: EntityComponentCtor = class BulletGraphicsComponent
  implements EntityGraphicsComponent {
  private readonly width = 5;
  private readonly height = 10;
  private readonly color = "black";

  update(bullet: GameObject, ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(bullet.x + this.width / 2, bullet.y + this.height / 2);
    ctx.rotate(bullet.rotation * (Math.PI / 180));
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }
};

// interface ZombieGraphicsComponentCtor {
//   new (image: HTMLImageElement): any;
// }
// export const ZombieGraphicsComponent: ZombieGraphicsComponentCtor = class ZombieGraphicsComponent
//   implements EntityGraphicsComponent {
//   public static imagesToLoad: HTMLImageElement[] = [];
//   public image: HTMLImageElement;

//   public widthHeight: Vector2;

//   constructor(image: HTMLImageElement) {
//     this.widthHeight = [image.width, image.height];
//     this.image = image;
//     // zombie.position = positionAroundPoint(positionToSpawnAround);
//   }

//   update(zombie: GameObject, ctx: CanvasRenderingContext2D): void {
//     ctx.drawImage(this.image, zombie.x, zombie.y);
//   }
// };

/**
 * ============================================================================
 * Game object
 * ============================================================================
 */
export class GameObject {
  public position: Vector2;
  public velocity: Vector2;
  public rotation: number;

  private readonly physics: EntityPhysicsComponent;
  private readonly graphics: EntityGraphicsComponent;
  private readonly input?: EntityInputComponent;

  constructor({
    startPosition: position,
    startVelocity: velocity,
    startRotation: rotation,
    Physics,
    Graphics,
    Input
  }: {
    startPosition: () => Vector2;
    startVelocity: Vector2;
    startRotation: number;
    Physics: EntityComponentCtor;
    Graphics: EntityComponentCtor;
    Input?: EntityComponentCtor;
  }) {
    this.position = position();
    this.velocity = velocity;
    this.rotation = rotation;
    this.physics = new Physics();
    //
    // if (Graphics.imagesToLoad) {
    //   new Graphics(Graphics.imagesToLoad);
    // } else {
    //   this.graphics = new Graphics();
    // }
    this.graphics = new Graphics();

    if (Input) {
      this.input = new Input();
    }
  }

  update(world: World, ctx: CanvasRenderingContext2D): void {
    if (this.input) {
      this.input.update(this, world);
    }
    this.physics.update(this, world);
    this.graphics.update(this, ctx);
  }

  public get x(): number {
    return this.position[0];
  }
  public get y(): number {
    return this.position[1];
  }
}
