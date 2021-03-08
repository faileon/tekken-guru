export type TimelineType = 'neutral' | 'start' | 'break' | 'result-fail' | 'result-success' | 'decoy';

export interface TimelineItem {
  type: TimelineType;
  start?: number;
  end?: number;
  breakButtons?: boolean[];
  buffer?: ArrayBuffer;
  resultBuffers?: {
    fail: ArrayBuffer,
    success: ArrayBuffer;
  };
}

export type ThrowType = 'throw-1' | 'throw-1+2' | 'throw-2';

export type PlayerSide = 'p1' | 'p2';
