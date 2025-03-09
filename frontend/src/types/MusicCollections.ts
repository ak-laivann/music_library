export interface MusicCollectionsType {
  id: string;
  name: string;
  artist: string;
  type: string;
  songCount: number;
  durationInSeconds: number;
  sizeInBytes: number;
  releasedOn: string;
}

export interface song {
  title: string;
  durationInSeconds: number;
  sizeInBytes: number;
  performers: string[];
}

export interface CollectionDetails extends MusicCollectionsType {
  songs: song[];
}
