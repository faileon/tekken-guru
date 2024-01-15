export type CategorizedData<T> = {
  name: string;
  data: T;
};

export type ContentOrder = {
  notation: number;
  video: number;
  frameData: number;
};

export type CharacterSort = 'position' | 'name RTL' | 'name LTR' | string;

export type FirestoreInstance = {
  app: Record<string, any>;
  databaseId: {
    database: string;
    projectId: string;
  };
  settings: {
    cache?: any;
    cacheSizeBytes: number;
    credentials?: any;
    host: string;
    useFetchStreams: boolean;
  };
};
