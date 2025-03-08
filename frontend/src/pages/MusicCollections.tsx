import { useNavigate } from "react-router-dom";
import { useCollections } from "../dao";
import { AsyncUIWrapper } from "../components";

export const MusicCollections = () => {
  const { data, isLoading, failureReason } = useCollections();
  const navigate = useNavigate();
  return (
    <AsyncUIWrapper failureReason={failureReason} isLoading={isLoading}>
      {data?.response.map((collection: any, index: number) => {
        return (
          <div key={index} style={{ display: "block" }}>
            <button onClick={() => navigate(`./${collection.id}`)}>
              {collection.artist} - {collection.songCount}
            </button>
          </div>
        );
      })}
    </AsyncUIWrapper>
  );
};
