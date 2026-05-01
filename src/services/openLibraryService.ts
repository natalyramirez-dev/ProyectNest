import { Book } from "@/types/book";
import { BookDetailType } from "@/types/bookDetail";

const BASE_URL = "https://openlibrary.org";

const fetchData = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener datos");
  }

  return response.json();
};

const searchRequest = async (
  type: string,
  value: string
): Promise<Book[]> => {

  const data = await fetchData(
    `${BASE_URL}/search.json?${type}=${encodeURIComponent(value)}&limit=20`
  );

  return data.docs;
};

export const searchBooks = async (
  query: string
): Promise<Book[]> => {

  return searchRequest("q", query);
};

export const searchByTitle = async (
  title: string
): Promise<Book[]> => {

  return searchRequest("title", title);
};

export const searchByAuthor = async (
  author: string
): Promise<Book[]> => {

  return searchRequest("author", author);
};

export const searchByTopic = async (
  topic: string
): Promise<Book[]> => {

  return searchRequest("subject", topic);
};

export const getBookCover = (
  coverId: number
): string => {

  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "/no-cover.png";
};

export const getLargeBookCover = (
  coverId?: number
): string => {

  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "/no-cover.png";
};

export const getBookDetail = async (
  workId: string
): Promise<BookDetailType> => {

  const cleanWorkId = workId.startsWith("/works/")
    ? workId
    : `/works/${workId}`;

  return fetchData(
    `${BASE_URL}${cleanWorkId}.json`
  );
};

export const getAuthorDetail = async (
  authorKey: string
): Promise<any> => {

  return fetchData(
    `${BASE_URL}${authorKey}.json`
  );
};