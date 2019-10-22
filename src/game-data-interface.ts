import { Vector2 } from './utilities/vectors';

// https://jvilk.com/MakeTypes/

export interface GameData {
  some_global_settings: SomeGlobalSettings;
  level1: Level1OrLevel2;
  level2: Level1OrLevel2;
}
export interface SomeGlobalSettings {
  game_speed: number;
  theme: string;
}
export interface Level1OrLevel2 {
  graves: (GravesEntity)[];
  stars: (StarsEntity)[] | null;
  player_position: PlayerPosition;
  victory_condition: VictoryCondition;
}
export interface GravesEntity {
  position?: Vector2 | null;
}
export interface StarsEntity {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface PlayerPosition {
  x: number;
  y: number;
}
export interface VictoryCondition {
  stars_required: number;
  time_limit: string;
}
