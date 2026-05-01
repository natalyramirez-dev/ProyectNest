"use client";

import { useEffect, useState } from "react";

import BookCard from "../../components/BookCard";

import { obtenerFavoritos } from "../../utils/favoritos";
import { Book } from "../../types/book";

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<Book[]>([]);

  useEffect(() => {
    const actualizarFavoritos = () => {
      const favoritosGuardados = obtenerFavoritos();

      const favoritosFiltrados =
        favoritosGuardados.filter(
          (libro, index, self) =>
            libro?.key &&
            index ===
              self.findIndex(
                (item) => item.key === libro.key
              )
        );

      setFavoritos(favoritosFiltrados);
    };

    actualizarFavoritos();

    window.addEventListener(
      "favoritosUpdated",
      actualizarFavoritos
    );

    return () => {
      window.removeEventListener(
        "favoritosUpdated",
        actualizarFavoritos
      );
    };
  }, []);

  return (
    <div className="favoritos-container">
      <h1>Mis Favoritos</h1>

      {favoritos.length === 0 && (
        <p>No hay favoritos aún</p>
      )}

      <div className="books-grid">
        {favoritos.map((libro) => (
          <BookCard
            key={libro.key}
            book={libro}
          />
        ))}
      </div>
    </div>
  );
}