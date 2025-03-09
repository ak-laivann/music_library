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
      data-testid="error_component"
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
      data-testid="loading"
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
