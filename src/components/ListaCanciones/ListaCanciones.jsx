import { formatearDuracion } from "../../utils/portada.js";
import "./ListaCanciones.css";

export default function ListaCanciones({ canciones, titulo }) {
  if (!canciones?.length) return null;

  return (
    <section className="seccion-canciones">
      <h2>{titulo}</h2>
      <ol className="lista-canciones">
        {canciones.map((pista, indice) => (
          <li key={pista.id} className="item-cancion">
            <span className="numero-cancion">{indice + 1}</span>
            <div className="info-cancion">
              <span className="titulo-cancion">{pista.titulo}</span>
              <span className="artista-cancion">{pista.artista?.nombre}</span>
            </div>
            <span className="duracion-cancion">
              {formatearDuracion(pista.duracionSeg)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}