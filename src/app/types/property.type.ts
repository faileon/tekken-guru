/*
* Special property of the move (Power Crush, Tail Spin, ...)
 */
export type MoveProperty =
  'SCREW' |
  'WALL BOUNCE' |
  'POWER CRUSH' |
  'HOMING' |
  'LOW CRUSH' |
  'HIGH CRUSH';

export type HitProperty = 'KND' | 'LAUNCH' | 'CROUCH' | string;
export type HitLevel = 'L' | 'M' | 'H';
