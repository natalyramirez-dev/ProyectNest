"use client";

import { useState } from "react";

import {
  searchByAuthor,
  searchByTitle,
  searchByTopic,
} from "../../services/openLibraryService";

import BookCard from "../../components/BookCard";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import FilterPanel from "@/components/FilterPanel";

import { Book } from "../../types/book";

type SearchType = "titulo" | "autor" | "tema";

const searchPlaceholders = {
  titulo: "Ej: Clean Code",
  autor: "Ej: Tolkien",
  tema: "Ej: Artificial Intelligence",
};

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] =
    useState<SearchType>("titulo");

  const [books, setBooks] = useState<Book[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // 🔥 filtros
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [language, setLanguage] = useState("");
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("");

  // 🔥 paginación
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);
    setCurrentPage(1);

    try {
      let results: Book[] = [];

      switch (searchType) {
        case "titulo":
          results = await searchByTitle(query);
          break;
        case "autor":
          results = await searchByAuthor(query);
          break;
        case "tema":
          results = await searchByTopic(query);
          break;
      }

      setBooks(results);
    } catch (error) {
      console.error(error);
      setError("Hubo un error al realizar la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") handleSearch();
  };

  // 🔥 filtros + ordenamiento
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

  // 🔥 paginación
  const totalPages = Math.ceil(
    filteredBooks.length / booksPerPage
  );

  const startIndex =
    (currentPage - 1) * booksPerPage;

  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  return (
    <div className="container">
      <h1>Buscador</h1>

      {/* 🔍 BÚSQUEDA INTEGRADA */}
      <div className="search-section">
        <div className="search-wrapper">
          <select
            className="search-type-select"
            value={searchType}
            onChange={(e) =>
              setSearchType(e.target.value as SearchType)
            }
          >
            <option value="titulo">Por Título</option>
            <option value="autor">Por Autor</option>
            <option value="tema">Por Tema</option>
          </select>

          <input
            type="text"
            value={query}
            className="search-input"
            placeholder={
              searchPlaceholders[searchType]
            }
            onChange={(e) =>
              setQuery(e.target.value)
            }
            onKeyDown={handleInputKeyDown}
          />

          <button
            className="search-btn"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* 🔥 FILTROS */}
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

      {/* ESTADOS */}
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading &&
        searched &&
        filteredBooks.length === 0 &&
        !error && (
          <p className="no-results">
            No se encontraron libros para &quot;{query}&quot;.
          </p>
        )}

      {/* RESULTADOS */}
      {!loading && filteredBooks.length > 0 && (
        <>
          <p className="results-count">
            {filteredBooks.length} resultados
            encontrados
          </p>

          <div className="book-grid">
            {currentBooks.map((book) => (
              <BookCard
                key={book.key}
                book={book}
              />
            ))}
          </div>

          {/* PAGINACIÓN */}
          {filteredBooks.length > booksPerPage && (
            <div className="pagination">
              <button
                onClick={() =>
                  setCurrentPage((p) => p - 1)
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
                  setCurrentPage((p) => p + 1)
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