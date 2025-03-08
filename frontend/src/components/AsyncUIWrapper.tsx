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
    <Error message={failureReason.message} />
  ) : isLoading ? (
    <Loading />
  ) : (
    children
  );
};
