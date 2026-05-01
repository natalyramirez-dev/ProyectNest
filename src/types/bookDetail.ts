export type AuthorType = {
  author: {
    key: string;
  };
};

export type BookDetailType = {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  authors?: { author: { key: string } }[];
  first_publish_date?: string;
};