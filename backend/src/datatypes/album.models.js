import { faker } from "@faker-js/faker";

// this function will be used inside the collection details to dynamically generate the song based on the collection -ep, album, single
function getSong(
  type,
  artistName,
  durationInSeconds,
  sizeInBytes,
  releasedOn,
  title
) {
  return {
    title: type === "Single" ? title : faker.music.songName(),
    durationInSeconds,
    sizeInBytes,
    performers: Array(faker.number.int({ min: 1, max: 4 }))
      .fill(null)
      .map((_, index) => (index === 0 ? artistName : faker.person.fullName())),
    releasedOn,
    type,
  };
}

// this getCollection will be used to simulate the values of collections as requested
function getCollection(type) {
  const id = faker.string.uuid();
  const name = type === "Single" ? faker.music.songName() : faker.music.album();
  const artist = faker.music.artist();
  const songCount =
    type === "Single" ? 1 : faker.number.int({ min: 2, max: 6 });

  const durationRange = {
    Single: { min: 120, max: 180 }, // for single, considering, the music will be within 2 minutes to 3 minutes range
    EP: { min: 170, max: 741 }, // for extended play, considering, the music will be within 3 minutes to 6 minutes range
    Album: { min: 350, max: 1262 }, // for album, considering, the music will be within 6 minutes to 12 minutes range
  };

  const sizeRange = {
    Single: { min: 1345678, max: 3145728 },
    EP: { min: 3145728, max: 12582132 },
    Album: { min: 3145728, max: 12582132 },
  };

  return {
    type,
    id,
    name,
    artist,
    type,
    songCount,
    durationInSeconds: faker.number.int(durationRange[type]),
    sizeInBytes: faker.number.int(sizeRange[type]),
    releasedOn: faker.date.anytime(),
  };
}

// this function will be used to simulate dynamically based on the values being created at the start of the server
export function getCollectionDetails(
  id,
  name,
  artist,
  type,
  songCount,
  releasedOn,
  durationInSeconds,
  sizeInBytes
) {
  const songs =
    type === "Single"
      ? [
          getSong(
            type,
            artist,
            durationInSeconds,
            sizeInBytes,
            releasedOn,
            name
          ),
        ]
      : Array(songCount)
          .fill(null)
          .map((_) => {
            return getSong(
              type,
              artist,
              durationInSeconds / songCount,
              sizeInBytes / songCount,
              releasedOn,
              " "
            );
          });

  return {
    id,
    name,
    artist,
    type,
    songCount,
    releasedOn,
    durationInSeconds,
    sizeInBytes,
    songs,
  };
}

export function createCollections() {
  const collections = Array.from({ length: 30 }, () =>
    getCollection(["EP", "Single", "Album"][Math.floor(Math.random() * 3)])
  );

  return collections;
}
