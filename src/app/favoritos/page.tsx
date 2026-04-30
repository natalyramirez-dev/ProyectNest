"use client";
import { useEffect, useState } from "react";
import { obtenerFavoritos, Libro } from "../../utils/favoritos";
import BookCard from "../../components/BookCard";

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Libro[]>([]);

  useEffect(() => {
    const actualizar = () => {
      const data = obtenerFavoritos();

      // limpiar inválidos y duplicados
      const filtrados = data.filter(
        (libro, index, self) =>
          libro?.key &&
          index === self.findIndex((l) => l.key === libro.key)
      );

      setFavoritos(filtrados);
    };

    // cargar al inicio
    actualizar();

    // 🔥 escuchar cambios de favoritos
    window.addEventListener("favoritosUpdated", actualizar);

    return () => {
      window.removeEventListener("favoritosUpdated", actualizar);
    };
  }, []);

  return (
    <div className="favoritos-container">
      <h1>Mis Favoritos</h1>

      {favoritos.length === 0 && <p>No hay favoritos aún</p>}

      <div className="books-grid">
        {favoritos.map((libro) => (
          <BookCard key={libro.key} book={libro} />
        ))}
      </div>
    </div>
  );
}