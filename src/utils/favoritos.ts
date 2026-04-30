import { Book } from "./book";

const KEY = "favoritos";

export type Libro = Book;

export const obtenerFavoritos = (): Libro[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const guardarFavoritos = (favoritos: Libro[]) => {
  localStorage.setItem(KEY, JSON.stringify(favoritos));
};

export const agregarFavorito = (libro: Libro) => {
  const favoritos = obtenerFavoritos();

  const existe = favoritos.find((f) => f.key === libro.key);
  if (existe) return;

  favoritos.push(libro);
  guardarFavoritos(favoritos);
};

export const eliminarFavorito = (key: string) => {
  const favoritos = obtenerFavoritos().filter((f) => f.key !== key);
  guardarFavoritos(favoritos);
};