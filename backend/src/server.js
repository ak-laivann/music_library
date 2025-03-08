import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { createCollections, getCollectionDetails } from "./datatypes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

let cache = {};
let cacheKeys = [];

// basic caching in javascript - add that to the object and check for the key
function checkCache(req, res, next) {
  const key = req.originalUrl;
  if (cache[key]) {
    console.log("ABCDEF U for asking me the same info again and again");
    return res.json(cache[key]);
  }
  next();
}

/* this will be used in injunction with the get request for the specific collection,
once that happens, the url willl be added to the cachekeys, and once it reaches more than 10,
the firstelement would be popped. Since procuring any other datatype would be difficult, 
added a string that would be used to delete in the original cache object. And also,
the cache object might have the values reordered based on the key's value. 
So storing them in the array would not sort it any way unless specifically done ;).
*/
function addToCache(key, data) {
  if (cacheKeys.length >= 2) {
    const oldestKey = cacheKeys.shift();
    delete cache[oldestKey];
  }
  cache[key] = data;
  cacheKeys.push(key);
}

/* creating the collections before running the server. Once the server runs, 
this would persist even between requests so that filter function would be easier */
const collections = createCollections();

// in development - my frontend would be in port 3000 and backend would be in port 5000 -
// since i can't see the live changes of the react app if served in same port
// so using cross origin resource sharing
app.use(cors());
app.use(express.json()); // lets me accept the json in req.body

// can replace the below two functions with routes - but this much is needed as of now
app.get("/api/collections", (req, res) => {
  res.json(collections);
});

app.get("/api/collections/:collectionId", checkCache, (req, res) => {
  const collection = collections.find((c) => c.id === req.params.collectionId);

  if (!collection) {
    return res.status(404).json({ message: "Collection not found" });
  }

  const collectionDetails = getCollectionDetails(
    collection.id,
    collection.name,
    collection.artist,
    collection.type,
    collection.songCount,
    collection.releasedOn,
    collection.durationInSeconds,
    collection.sizeInBytes
  );

  addToCache(req.originalUrl, collectionDetails);
  res.json(collectionDetails);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist"))); // lets me serve the frontend in the same port as backend
  // although the frontend is yet to be built.
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on http://localhost:", PORT);
});
