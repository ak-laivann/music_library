import { Routes, Route, Navigate } from "react-router-dom";
import { MusicCollectionDetails, MusicCollections } from "./pages";

export const RootRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"/collections"} />} />
      <Route path="/collections" element={<MusicCollections />} />
      <Route path="/collections/:id" element={<MusicCollectionDetails />} />
    </Routes>
  );
};
