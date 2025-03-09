import { Loading } from "./Loading";
import { Error } from "./Error";

export const AsyncUIWrapper = ({
  isLoading,
  children,
  failureReason,
}: {
  isLoading: boolean;
  children: React.ReactElement;
  failureReason?: Error | null;
}) => {
  return !!failureReason ? (
    <div
      style={{
        display: "flex",
        height: "50vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Error message={failureReason.message} />
    </div>
  ) : isLoading ? (
    <div
      style={{
        display: "flex",
        height: "50vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading />
    </div>
  ) : (
    children
  );
};
