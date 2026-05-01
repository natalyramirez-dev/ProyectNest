import { FilterPanelProps } from "@/types/filter";

export default function FilterPanel({
  minYear,
  maxYear,
  language,
  author,
  sortBy,
  setMinYear,
  setMaxYear,
  setLanguage,
  setAuthor,
  setSortBy,
}: FilterPanelProps) {
  return (
    <div className="filter-panel">
      <input
        type="number"
        placeholder="Año mínimo"
        value={minYear}
        onChange={(e) => setMinYear(e.target.value)}
      />

      <input
        type="number"
        placeholder="Año máximo"
        value={maxYear}
        onChange={(e) => setMaxYear(e.target.value)}
      />

      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">Todos los idiomas</option>
        <option value="spa">Español</option>
        <option value="eng">Inglés</option>
        <option value="fre">Francés</option>
        <option value="ger">Alemán</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sin ordenar</option>
        <option value="year">Ordenar por año</option>
        <option value="editions">Ordenar por ediciones</option>
      </select>
    </div>
  );
}