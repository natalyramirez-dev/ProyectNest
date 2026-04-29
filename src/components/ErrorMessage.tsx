type Props = { message: string };

export default function ErrorMessage({ message }: Props) {
  return <p style={{ textAlign: "center", color: "red", marginTop: "40px" }}>{message}</p>;
}