// import { GameObject } from "./components";
// import { loadImage, loadAudio, loadJSON } from "../src/utilities/loader";

// /**
//  * ============================================================================
//  * World
//  * ============================================================================
//  */
// export class World {
//   public score = 0;
//   public numberOfBullets = 10;

//   public sounds = {
//     explosionSound: {} as HTMLAudioElement,
//     invaderkilledSound: {} as HTMLAudioElement,
//     shootSound: {} as HTMLAudioElement
//   };

//   entities: { [key: string]: GameObject[] } = {
//     hero: [],
//     zombies: [],
//     bullets: [],
//     graves: [],
//     screenText: []
//   };

//   /**
//    * ==========================================================================
//    * Entity factory
//    * ==========================================================================
//    */
//   entityFactory = <
//     T extends {
//       new (...args: any[]): any;
//     }
//   >(
//     classToCreate: T,
//     entityKey: keyof World["entities"],
//     numberOf: number,
//     ...args: ConstructorParameters<T>
//   ): void => {
//     this.entities[entityKey].push(
//       ...[...Array(numberOf)].map(() => new classToCreate(...args))
//     );
//   };

//   /**
//    * ==========================================================================
//    * Asset loader
//    * ==========================================================================
//    */
//   public static async loadAssets(world: World): Promise<void> {
//     [
//       world.sounds.explosionSound,
//       world.sounds.invaderkilledSound,
//       world.sounds.shootSound
//       // Zombie.imagesToLoad[0],
//       // world.gameData,
//     ] = await Promise.all([
//       loadAudio("./assets/explosion.wav"),
//       loadAudio("./assets/invaderkilled.wav"),
//       loadAudio("./assets/shoot.wav")
//       // load.loadImage('./assets/zombie64-final.png'),
//       // load.loadJSON<GameData>('src/game-data.json'),
//     ]);
//   }
// }
