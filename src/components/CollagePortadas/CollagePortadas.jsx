import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./CollagePortadas.css";

const PORTADAS_COLLAGE = {
  principal: {
    patron: 2,
    fondo: "var(--portada-3)",
    figura: "var(--fondo-base)",
  },
  superior: {
    patron: 1,
    fondo: "var(--portada-2)",
    figura: "var(--portada-4)",
  },
  inferior: {
    patron: 0,
    fondo: "var(--portada-5)",
    figura: "var(--portada-1)",
    detalle: "var(--portada-5)",
  },
};

export default function CollagePortadas() {
  return (
    <div className="collage-sintonia" aria-hidden="true">
      <PortadaAlbum portada={PORTADAS_COLLAGE.principal} className="album-principal" />
      <PortadaAlbum portada={PORTADAS_COLLAGE.superior} className="album-superior" />
      <PortadaAlbum portada={PORTADAS_COLLAGE.inferior} className="album-inferior" />
      <div className="nota-sintonia">
        <b>
          Sube la niebla
          <br />
          por la montaña
        </b>
        <br />y el camino canta
      </div>
    </div>
  );
}
