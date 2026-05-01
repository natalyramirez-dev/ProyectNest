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

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);

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

      setError(
        "Hubo un error al realizar la búsqueda."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h1>Buscador</h1>

      <div className="search-section">
        <div className="search-type-selector">
          <button
            className={
              searchType === "titulo" ? "active" : ""
            }
            onClick={() => setSearchType("titulo")}
          >
            Por Título
          </button>

          <button
            className={
              searchType === "autor" ? "active" : ""
            }
            onClick={() => setSearchType("autor")}
          >
            Por Autor
          </button>

          <button
            className={
              searchType === "tema" ? "active" : ""
            }
            onClick={() => setSearchType("tema")}
          >
            Por Tema / Palabra clave
          </button>
        </div>

        <div className="search-input-row">
          <input
            type="text"
            value={query}
            className="search-input"
            placeholder={searchPlaceholders[searchType]}
            onChange={(event) =>
              setQuery(event.target.value)
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

      {loading && <Loading />}

      {error && (
        <ErrorMessage message={error} />
      )}

      {!loading &&
        searched &&
        books.length === 0 &&
        !error && (
          <p className="no-results">
            No se encontraron libros para "{query}".
          </p>
        )}

      {!loading && books.length > 0 && (
        <>
          <p className="results-count">
            {books.length} resultados encontrados
          </p>

          <div className="book-grid">
            {books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}