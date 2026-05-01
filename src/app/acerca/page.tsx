export default function AcercaPage() {
  return (
    <div className="container">
      <h1>Acerca del Proyecto</h1>

      <p>
        Biblioteca Inteligente es una aplicación desarrollada con Next.js y
        React que permite buscar libros usando la API pública de Open Library.
      </p>

      <p>
        Los usuarios pueden explorar libros, ver detalles, aplicar filtros y
        guardar favoritos utilizando localStorage.
      </p>

      <h2>Tecnologías utilizadas</h2>

      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>SCSS</li>
        <li>Open Library API</li>
      </ul>
    </div>
  );
}