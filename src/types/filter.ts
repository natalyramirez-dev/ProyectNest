export type FilterPanelProps = {
  minYear: string;
  maxYear: string;
  language: string;
  author: string;
  sortBy: string;
  setMinYear: (value: string) => void;
  setMaxYear: (value: string) => void;
  setLanguage: (value: string) => void;
  setAuthor: (value: string) => void;
  setSortBy: (value: string) => void;
};