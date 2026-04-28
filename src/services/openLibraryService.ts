const BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?q=${query}`);

    if (!response.ok) {
      throw new Error("Error al buscar libros");
    }

    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error en searchBooks:", error);
    throw error;
  }
};

export const getBookCover = (coverId: number) => {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "/no-cover.png";
};

export const getBookDetail = async (workId: string) => {
  try {
    const response = await fetch(`${BASE_URL}${workId}.json`);

    if (!response.ok) {
      throw new Error("Error al obtener detalles del libro");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getBookDetail:", error);
    throw error;
  }
};
