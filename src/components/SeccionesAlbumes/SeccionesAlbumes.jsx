import TarjetaAlbum from "../TarjetaAlbum/TarjetaAlbum.jsx";
import Flecha from "../Flecha/Flecha.jsx";
import "./SeccionesAlbumes.css";

export default function SeccionAlbumes({
  textos,
  albumes = [],
  cargando = false,
  error = false,
  titulo,
  filaHorizontal = false,
  filaHorizontalMovil = false,
  mostrarEnlaceDescubrirMas = true,
  onSeleccionar,
}) {
  const destacados = textos?.paginas?.inicioPublico?.destacados;
  const tituloFinal = titulo || destacados?.titulo;
  const vacio = !cargando && !error && albumes.length === 0;

  return (
    <section
      className="ancho-home seccion-albumes"
      id="albumes"
      aria-labelledby="albumes-titulo"
      aria-busy={cargando}
    >
      <div className="titulo-seccion">
        <h2 id="albumes-titulo">{tituloFinal}</h2>
        {mostrarEnlaceDescubrirMas && destacados?.enlaces?.descubrirMas && (
          <a className="enlace-home" href="#catalogo">
            {destacados.enlaces.descubrirMas} <Flecha />
          </a>
        )}
      </div>

      {cargando && (
        <p role="status" className="texto-vacio">
          {textos?.estados?.cargando?.titulo}
        </p>
      )}

      {error && (
        <p role="alert" className="texto-vacio">
          {textos?.estados?.error?.titulo}
        </p>
      )}

      <div
        className={`albumes-grid${filaHorizontal ? " albumes-grid-fila" : ""}${filaHorizontalMovil ? " albumes-grid-fila-movil" : ""}`}
      >
        {albumes.map((album) => (
          <TarjetaAlbum key={album.id} album={album} onSeleccionar={onSeleccionar} />
        ))}
      </div>

      {vacio && (
        <p role="status" className="texto-vacio">
          {textos?.paginas?.catalogo?.vacio?.texto}
        </p>
      )}
    </section>
  );
}