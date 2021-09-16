export interface PersistenceTimestamps {
  // [path to collection]: unix timestamp
  // /characters/leroy/movelist: 1564678979
  [path: string]: number;
}
