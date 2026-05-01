export default function AcercaPage() {
  return (
    <div className="container">
      <h1>Acerca del Proyecto</h1>

      <p>
        Biblioteca Inteligente es una aplicación desarrollada con Next.js y
        React que consume la API pública de Open Library para explorar libros,
        buscar información y guardar favoritos.
      </p>

      <p>
        El proyecto permite realizar búsquedas por título, autor o tema,
        aplicar filtros avanzados y visualizar detalles completos de cada obra.
      </p>

      <h2>Tecnologías utilizadas</h2>

      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>SCSS</li>
        <li>Open Library API</li>
        <li>localStorage</li>
      </ul>

      <h2>Características principales</h2>

      <ul>
        <li>Búsqueda avanzada de libros</li>
        <li>Filtros por año, idioma y autor</li>
        <li>Sistema de favoritos persistente</li>
        <li>Página de detalle de libros</li>
        <li>Diseño responsive</li>
      </ul>
    </div>
  );
}