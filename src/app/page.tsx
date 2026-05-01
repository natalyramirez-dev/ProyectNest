"use client";

import { useEffect, useState } from "react";

import BookCard from "../components/BookCard";
import SkeletonCard from "../components/SkeletonCard";
import ErrorMessage from "@/components/ErrorMessage";

import { searchBooks } from "../services/openLibraryService";
import { Book } from "../types/book";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await searchBooks("programming");
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar libros");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h1>Biblioteca Inteligente</h1>

        <div className="book-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container">
      <h1>Biblioteca Inteligente</h1>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}