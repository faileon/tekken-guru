export type CategorizedData<T> = {
  name: string;
  data: T;
};

export type ContentOrder = {
  notation: number;
  video: number;
  frameData: number;
};

export type CharacterSort = 'position' | 'fullName RTL' | 'fullName LTR' | string;
