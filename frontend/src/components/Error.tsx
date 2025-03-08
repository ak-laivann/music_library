import { Alert } from "antd";
export const Error = ({ message }: { message: string }) => {
  return (
    <Alert type="error" banner={true} showIcon={true} description={message} />
  );
};
