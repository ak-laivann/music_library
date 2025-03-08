import { useNavigate } from "react-router-dom";

export const MusicCollectionDetails = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("../")}>Go to Collections Page</button>
  );
};
