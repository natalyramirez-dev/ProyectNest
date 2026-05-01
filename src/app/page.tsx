"use client";

import { useEffect, useState } from "react";

import BookCard from "../components/BookCard";
import ErrorMessage from "@/components/ErrorMessage";
import FilterPanel from "../components/FilterPanel";
import SkeletonCard from "../components/SkeletonCard";

import { searchBooks } from "../services/openLibraryService";

import { Book } from "../types/book";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [language, setLanguage] = useState("");
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await searchBooks("programming");

        setBooks(data);
      } catch (error) {
        console.error(error);

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

      const matchesMinYear =
        !minYear || year >= Number(minYear);

      const matchesMaxYear =
        !maxYear || year <= Number(maxYear);

      const matchesAuthor =
        !author ||
        book.author_name?.some((name) =>
          name
            .toLowerCase()
            .includes(author.toLowerCase())
        );

      const matchesLanguage =
        !language ||
        book.language?.includes(language);

      return (
        matchesMinYear &&
        matchesMaxYear &&
        matchesAuthor &&
        matchesLanguage
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year":
          return (
            (b.first_publish_year || 0) -
            (a.first_publish_year || 0)
          );

        case "editions":
          return (
            (b.edition_count || 0) -
            (a.edition_count || 0)
          );

        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(
    filteredBooks.length / booksPerPage
  );

  const startIndex =
    (currentPage - 1) * booksPerPage;

  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  if (loading) {
    return (
      <div className="container">
        <h1>Biblioteca Inteligente</h1>

        <div className="book-grid">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <SkeletonCard key={index} />
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container">
      <h1>Biblioteca Inteligente</h1>

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

      <p>
        Resultados encontrados:{" "}
        {filteredBooks.length}
      </p>

      {filteredBooks.length === 0 && (
        <p className="no-results">
          No se encontraron libros con esos
          filtros.
        </p>
      )}

      {filteredBooks.length > 0 && (
        <>
          <div className="book-grid">
            {currentBooks.map((book) => (
              <BookCard
                key={book.key}
                book={book}
              />
            ))}
          </div>

          {filteredBooks.length >
            booksPerPage && (
            <div className="pagination">
              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev - 1
                  )
                }
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              <span>
                Página {currentPage} de{" "}
                {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev + 1
                  )
                }
                disabled={
                  currentPage === totalPages
                }
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}