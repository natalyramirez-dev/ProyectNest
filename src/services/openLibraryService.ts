const BASE_URL = "https://openlibrary.org";

// Búsqueda general 
export const searchBooks = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=20`);
    if (!response.ok) throw new Error("Error al buscar libros");
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error en searchBooks:", error);
    throw error;
  }
};

// Búsqueda por TÍTULO 
export const searchByTitle = async (title: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?title=${encodeURIComponent(title)}&limit=20`);
    if (!response.ok) throw new Error("Error al buscar por título");
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error en searchByTitle:", error);
    throw error;
  }
};

// Búsqueda por AUTOR 
export const searchByAuthor = async (author: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?author=${encodeURIComponent(author)}&limit=20`);
    if (!response.ok) throw new Error("Error al buscar por autor");
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error en searchByAuthor:", error);
    throw error;
  }
};

// Búsqueda por TEMA / PALABRA CLAVE 
export const searchByTopic = async (topic: string) => {
  try {
    const response = await fetch(`${BASE_URL}/search.json?subject=${encodeURIComponent(topic)}&limit=20`);
    if (!response.ok) throw new Error("Error al buscar por tema");
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("Error en searchByTopic:", error);
    throw error;
  }
};

// Obtener portada 
export const getBookCover = (coverId: number) => {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "/no-cover.png";
};

// Detalle de obra 
export const getBookDetail = async (workId: string) => {
  try {
    const response = await fetch(`${BASE_URL}${workId}.json`);
    if (!response.ok) throw new Error("Error al obtener detalles del libro");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getBookDetail:", error);
    throw error;
  }
};
