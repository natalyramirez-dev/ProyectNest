+"use client";

import { useState } from "react";
import { searchByTitle, searchByAuthor, searchByTopic } from "../../services/openLibraryService";
import BookCard from "../../components/BookCard";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Book } from "../../utils/book";

type SearchType = "titulo" | "autor" | "tema";

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("titulo");
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

      if (searchType === "titulo") {
        results = await searchByTitle(query);
      } else if (searchType === "autor") {
        results = await searchByAuthor(query);
      } else {
        results = await searchByTopic(query);
      }

      setBooks(results);
    } catch (err) {
      setError("Hubo un error al realizar la búsqueda. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container">
      <h1>Buscador</h1>

      <div className="search-section">
        <div className="search-type-selector">
          <button
            className={searchType === "titulo" ? "active" : ""}
            onClick={() => setSearchType("titulo")}
          >
            Por Título
          </button>
          <button
            className={searchType === "autor" ? "active" : ""}
            onClick={() => setSearchType("autor")}
          >
            Por Autor
          </button>
          <button
            className={searchType === "tema" ? "active" : ""}
            onClick={() => setSearchType("tema")}
          >
            Por Tema / Palabra clave
          </button>
        </div>

        <div className="search-input-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              searchType === "titulo"
                ? "Ej: Clean Code"
                : searchType === "autor"
                ? "Ej: Tolkien"
                : "Ej: Artificial Intelligence"
            }
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && searched && books.length === 0 && !error && (
        <p className="no-results">No se encontraron libros para "{query}".</p>
      )}

      {!loading && books.length > 0 && (
        <>
          <p className="results-count">{books.length} resultados encontrados</p>
          <div className="book-grid">
            {books.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}