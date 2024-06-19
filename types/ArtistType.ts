// types.ts
export type Artist = {
  artist_name: string;
};

export type LiveData = {
  live_id: string;
  live_title: string;
  date: Date;
  venue?: string;
  capacity?: number;
  artists: Artist[];
};
