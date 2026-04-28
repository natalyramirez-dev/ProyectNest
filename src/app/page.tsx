"use client";

import { useEffect, useState } from "react";
import { searchBooks } from "../services/openLibraryService";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await searchBooks("programming");
        setBooks(data);
      } catch (err) {
        setError("Error al cargar libros");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>📚 Biblioteca Inteligente</h1>

      <div className="book-grid">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}