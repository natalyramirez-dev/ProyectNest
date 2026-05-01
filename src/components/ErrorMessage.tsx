import { ErrorMessageProps } from "../utils/error";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <p>{message}</p>
    </div>
  );
}