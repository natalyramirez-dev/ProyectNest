import { getBookCover } from "../services/openLibraryService";
import { Book } from "../utils/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const coverUrl = getBookCover(book.cover_i || 0);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const exists = favorites.find((fav: Book) => fav.key === book.key);

    if (!exists) {
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} />

      <h3>{book.title}</h3>

      <p>
        <strong>Autor:</strong>{" "}
        {book.author_name ? book.author_name.join(", ") : "Desconocido"}
      </p>

      <p>
        <strong>Año:</strong> {book.first_publish_year || "N/A"}
      </p>

      <p>
        <strong>Ediciones:</strong> {book.edition_count || 0}
      </p>

      <div className="buttons">
        <button>Ver detalle</button>
        <button onClick={handleFavorite}>Agregar a favoritos</button>
      </div>
    </div>
  );
}