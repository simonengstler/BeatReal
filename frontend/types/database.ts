export type Reaction = {
  username: string;
  reaction: string;
  timestamp: number;
};

export type Song = {
  sharedSongId: string;
  timestamp: number;
  username: string;
  songLink: string;
  reactions?: Reaction[];
};

export type Group = {
  description: string;
  name: string;
  members: string[];
  sharedSongs?: Song[];
};

export type TopSong = {
  songLink: string;
  groupId: string;
  timestamp: number;
  reactionCount: number;
  username: string; 
}