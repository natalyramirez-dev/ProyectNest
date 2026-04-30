"use client";
import { useEffect, useState } from "react";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritos,
} from "../utils/favoritos";
import { Book } from "../utils/book";

interface Props {
  libro: Book;
}

export default function BotonFavorito({ libro }: Props) {
  const [esFavorito, setEsFavorito] = useState(false);

  const verificarFavorito = () => {
    const favoritos = obtenerFavoritos();
    const existe = favoritos.some((f) => f.key === libro.key);
    setEsFavorito(existe);
  };

  useEffect(() => {
    verificarFavorito();

    window.addEventListener("favoritosUpdated", verificarFavorito);

    return () => {
      window.removeEventListener("favoritosUpdated", verificarFavorito);
    };
  }, [libro.key]);

  const toggleFavorito = () => {
    if (esFavorito) {
      eliminarFavorito(libro.key);
    } else {
      agregarFavorito(libro);
    }

    verificarFavorito();

    window.dispatchEvent(new Event("favoritosUpdated"));
  };

  return (
    <button onClick={toggleFavorito}>
      {esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    </button>
  );
}