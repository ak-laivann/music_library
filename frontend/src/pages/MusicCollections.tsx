import { useNavigate } from "react-router-dom";

export const MusicCollections = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate("./id")}>Go to Details Page</button>;
};
