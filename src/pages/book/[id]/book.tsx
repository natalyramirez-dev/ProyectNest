import { useEffect, useState } from "react";
import { getBookDetail } from "../../../services/openLibraryService";

export default function BookDetail({ params }: any) {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getBookDetail(`/works/${params.id}`);
      setBook(data);
    };

    fetchDetail();
  }, [params.id]);

  if (!book) return <p>Cargando detalle...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>

      <p>
        <strong>Descripción:</strong>{" "}
        {book.description
          ? typeof book.description === "string"
            ? book.description
            : book.description.value
          : "Sin descripción"}
      </p>
    </div>
  );
}