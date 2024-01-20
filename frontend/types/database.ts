export type Song = {
  sharedSongId: string;
  timestamp: number;
  username: string;
  songLink: string;
};

export type Group = {
  description: string;
  name: string;
  members: string[];
  sharedSongs?: Song[];
};
