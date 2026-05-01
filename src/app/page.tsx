"use client";

import { useEffect, useState } from "react";
import { searchBooks } from "../services/openLibraryService";
import BookCard from "../components/BookCard";
import FilterPanel from "../components/FilterPanel";
import { Book } from "../utils/book";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [language, setLanguage] = useState("");
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("");

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

  const filteredBooks = books
    .filter((book) => {
      const year = book.first_publish_year || 0;

      const matchesMinYear = !minYear || year >= Number(minYear);
      const matchesMaxYear = !maxYear || year <= Number(maxYear);

      const matchesAuthor =
        !author ||
        book.author_name?.some((name) =>
          name.toLowerCase().includes(author.toLowerCase())
        );

      const matchesLanguage =
        !language || book.language?.includes(language);

      return (
        matchesMinYear &&
        matchesMaxYear &&
        matchesAuthor &&
        matchesLanguage
      );
    })
    .sort((a, b) => {
      if (sortBy === "year") {
        return (b.first_publish_year || 0) - (a.first_publish_year || 0);
      }

      if (sortBy === "editions") {
        return (b.edition_count || 0) - (a.edition_count || 0);
      }

      return 0;
    });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Biblioteca Inteligente</h1>

      {/* Panel de filtros */}
      <FilterPanel
        minYear={minYear}
        maxYear={maxYear}
        language={language}
        author={author}
        sortBy={sortBy}
        setMinYear={setMinYear}
        setMaxYear={setMaxYear}
        setLanguage={setLanguage}
        setAuthor={setAuthor}
        setSortBy={setSortBy}
      />

      <p>Resultados encontrados: {filteredBooks.length}</p>
      { filteredBooks.length === 0 && (
        <p className="no-results">
          No se encontraron libros con esos filtros.
        </p>
      )}

      {filteredBooks.length > 0 && (
        <div className="book-grid">
              {filteredBooks.map((book, index) => (
                <BookCard key={book.key || index} book={book} />
              ))}
            </div>
          )}
        </div>
      );
}