/*
* Special property of the move (Power Crush, Tail Spin, ...)
 */
export type MoveProperty =
  'SCREW' |
  'WALL BOUNCE' |
  'POWER CRUSH' |
  'HOMING' |
  'LOW CRUSH' |
  'HIGH CRUSH' |
  'THROW 1' |
  'THROW 2' |
  'THROW 1+2';

export type HitProperty = 'KND' | 'LAUNCH' | 'CROUCH' | 'CS' | string;
export type HitLevel = 'L' | 'M' | 'H';
