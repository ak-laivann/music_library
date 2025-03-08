import { useNavigate, useParams } from "react-router-dom";
import { useCollectionDetails } from "../dao";
import { AsyncUIWrapper } from "../components";
import { Typography } from "antd";

export const MusicCollectionDetails = () => {
  const { id } = useParams();
  const { data, isLoading, failureReason } = useCollectionDetails(id!);
  const navigate = useNavigate();

  return (
    <AsyncUIWrapper isLoading={isLoading} failureReason={failureReason}>
      <>
        <Typography.Text
          onClick={() => {
            navigate("../");
          }}
        >
          Overview
        </Typography.Text>{" "}
        {" > "} {data?.response.artist}
        {data?.response.songs.map((song: any) => {
          return (
            <p>
              {song.title} -{" "}
              {song.performers.map((performer: string) => {
                return <span>{performer}</span>;
              })}
            </p>
          );
        })}
      </>
    </AsyncUIWrapper>
  );
};
