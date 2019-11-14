import { Vector2 } from './utilities/vectors';

// https://jvilk.com/MakeTypes/

export interface GameData {
  readonly some_global_settings: SomeGlobalSettings;
  readonly level1: Level1OrLevel2;
  readonly level2: Level1OrLevel2;
}
export interface SomeGlobalSettings {
  readonly game_speed: number;
  readonly theme: string;
}
export interface Level1OrLevel2 {
  readonly graves: GravesEntity[];
  readonly stars: StarsEntity[] | null;
  readonly player_position: PlayerPosition;
  readonly victory_condition: VictoryCondition;
}
export interface GravesEntity {
  readonly position?: Vector2 | null;
}
export interface StarsEntity {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}
export interface PlayerPosition {
  readonly x: number;
  readonly y: number;
}
export interface VictoryCondition {
  readonly stars_required: number;
  readonly time_limit: string;
}
