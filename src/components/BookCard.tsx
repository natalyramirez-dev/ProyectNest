"use client";

import { useRouter } from "next/navigation";

import BotonFavorito from "./BotonFavorito";

import { getBookCover } from "@/services/openLibraryService";
import { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const router = useRouter();

  const {
    key,
    title,
    cover_i,
    author_name,
    first_publish_year,
    edition_count,
  } = book;

  const coverUrl = getBookCover(cover_i || 0);

  const handleDetail = () => {
    const workId = key.replace("/works/", "");
    router.push(`/book/${workId}`);
  };

  return (
    <div className="book-card">
      <img src={coverUrl} alt={title} />

      <h3>{title}</h3>

      <p>
        <strong>Autor:</strong>{" "}
        {author_name?.join(", ") || "Desconocido"}
      </p>

      <p>
        <strong>Año:</strong> {first_publish_year || "N/A"}
      </p>

      <p>
        <strong>Ediciones:</strong> {edition_count || 0}
      </p>

      <div className="buttons">
        <button onClick={handleDetail}>
          Ver detalle
        </button>

        <BotonFavorito libro={book} />
      </div>
    </div>
  );
}