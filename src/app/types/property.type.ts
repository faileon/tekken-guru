/*
 * Special property of the move (Power Crush, Tail Spin, ...)
 */
export type MoveProperty =
  | 'SCREW'
  | 'TORNADO'
  | 'HEAT ENGAGER'
  | 'CHIP'
  | 'WALL CRUSH'
  | 'WALL BOUNCE'
  | 'POWER CRUSH'
  | 'HOMING'
  | 'LOW CRUSH'
  | 'HIGH CRUSH'
  | 'WALL BREAK'
  | 'WALL SPLAT'
  | 'FLOOR BREAK'
  | 'THROW 1'
  | 'THROW 2'
  | 'THROW 1+2';

export type HitProperty = 'KND' | 'LAUNCH' | 'CROUCH' | 'CS';
export type HitLevel = 'L' | 'M' | 'H';
