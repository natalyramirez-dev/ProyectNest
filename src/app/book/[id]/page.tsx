"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getBookDetail,
  getLargeBookCover,
  getAuthorDetail,
} from "@/services/openLibraryService";

type BookDetailType = {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  authors?: { author: { key: string } }[];
  first_publish_date?: string;
};

export default function BookDetail() {
const params = useParams();
const id = params?.id as string;

const [book, setBook] = useState<BookDetailType | null>(null);
const [authors, setAuthors] = useState<string[]>([]);
const router = useRouter();
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getBookDetail(id as string);
        setBook(data);

        // 🔥 Obtener autores
        if (data.authors) {
          const authorPromises = data.authors.map((a: { author: { key: string } }) =>
            getAuthorDetail(a.author.key)
          );

          const authorData = await Promise.all(authorPromises);
          setAuthors(authorData.map((a) => a.name));
        }
      } catch (error) {
        console.error("Error cargando detalle");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!book) return <p>No se encontró el libro</p>;

  const coverUrl = getLargeBookCover(book.covers?.[0]);

  return (
    <div className="container">
      {/* BOTÓN VOLVER */}
      <button onClick={() => router.back()}>⬅ Volver</button>

      <div className="detail-container">
        {/* PORTADA */}
        <img src={coverUrl} alt={book.title} className="detail-cover" />

        <div className="detail-info">
          {/* TÍTULO */}
          <h1>{book.title}</h1>

          {/* AUTORES */}
          <p>
            <strong>Autores:</strong>{" "}
            {authors.length > 0 ? authors.join(", ") : "No disponible"}
          </p>

          {/* AÑO */}
          <p>
            <strong>Año de publicación:</strong>{" "}
            {book.first_publish_date || "No disponible"}
          </p>

          {/* DESCRIPCIÓN */}
          <p>
            <strong>Descripción:</strong>{" "}
            {typeof book.description === "string"
              ? book.description
              : book.description?.value || "No disponible"}
          </p>

          {/* TEMAS */}
          <p>
            <strong>Temas:</strong>{" "}
            {book.subjects?.slice(0, 5).join(", ") || "No disponible"}
          </p>

          {/* ENLACE */}
          <a
            href={`https://openlibrary.org/works/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver en OpenLibrary
          </a>

          {/* FAVORITOS (solo botón visual) */}
          <button>Agregar a favoritos</button>
        </div>
      </div>
    </div>
  );
}