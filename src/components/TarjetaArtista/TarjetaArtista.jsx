// src/components/TarjetaArtista/TarjetaArtista.jsx
import "./TarjetaArtista.css";

export default function TarjetaArtista({ artista, textos }) {
  const etiqueta =
    textos?.paginas?.catalogo?.genero?.artistas?.etiqueta || "Artista";

  // Tomamos el color hexadecimal directo que manda la API (portada.fondo)
  const colorFondo = artista.portada?.fondo;

  return (
    <article className="tarjeta-artista">
      <div
        className="avatar-artista"
        style={colorFondo ? { backgroundColor: colorFondo } : undefined}
        aria-hidden="true"
      />
      <h3>{artista.nombre}</h3>
      <span>{etiqueta}</span>
    </article>
  );
}