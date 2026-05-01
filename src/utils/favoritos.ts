import { Book } from "@/types/book";

const FAVORITOS_KEY = "favoritos";

export const obtenerFavoritos = (): Book[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const favoritosGuardados =
    localStorage.getItem(FAVORITOS_KEY);

  return favoritosGuardados
    ? JSON.parse(favoritosGuardados)
    : [];
};

export const guardarFavoritos = (
  favoritos: Book[]
): void => {

  localStorage.setItem(
    FAVORITOS_KEY,
    JSON.stringify(favoritos)
  );
};

export const agregarFavorito = (
  libro: Book
): void => {

  const favoritos = obtenerFavoritos();

  const yaExiste = favoritos.some(
    (favorito) => favorito.key === libro.key
  );

  if (yaExiste) {
    return;
  }

  const nuevosFavoritos = [
    ...favoritos,
    libro,
  ];

  guardarFavoritos(nuevosFavoritos);
};

export const eliminarFavorito = (
  key: string
): void => {

  const favoritosActualizados =
    obtenerFavoritos().filter(
      (favorito) => favorito.key !== key
    );

  guardarFavoritos(favoritosActualizados);
};