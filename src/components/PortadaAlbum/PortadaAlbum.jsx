import "./PortadaAlbum.css";

export default function PortadaAlbum({ portada = 0, className = "" }) {
  if (!portada) return null;

  const { patron, fondo, figura, detalle } = portada;

  const numPatron =
    typeof patron === "number" ? patron : parseInt(patron, 10) || 0;

  const colorDetalle = detalle || "#FFFFFF";

  return (
    <svg
      className={`portada-album ${className}`}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Portada"
    >
      {/* Rectángulo de fondo común a todos los patrones */}
      <rect width="100" height="100" fill={fondo} />

      {/* 0 · anillos: tres círculos que salen de la esquina inferior derecha */}
      {numPatron === 0 && (
        <>
          <circle cx="100" cy="100" r="85" fill={figura} />
          <circle cx="100" cy="100" r="62.5" fill={fondo} />
          <circle cx="100" cy="100" r="40" fill={figura} />
        </>
      )}

      {/* 1 · rayas: cuatro rayas diagonales */}
      {numPatron === 1 && (
        <g fill={figura}>
          <rect
            x="-34"
            y="40"
            width="182"
            height="11.4"
            transform="rotate(-35 -34 40)"
          />
          <rect
            x="-30.7"
            y="66"
            width="182"
            height="11.4"
            transform="rotate(-35 -30.7 66)"
          />
          <rect
            x="-27.3"
            y="92"
            width="182"
            height="11.4"
            transform="rotate(-35 -27.3 92)"
          />
          <rect
            x="-23.9"
            y="118.2"
            width="182"
            height="11.4"
            transform="rotate(-35 -23.9 118.2)"
          />
        </g>
      )}

      {/* 2 · colina: un círculo grande abajo (figura) y uno pequeño arriba a la derecha (detalle) */}
      {numPatron === 2 && (
        <>
          <circle cx="50" cy="86.4" r="34.1" fill={figura} />
          <circle cx="76.7" cy="23.3" r="10.8" fill={colorDetalle} />
        </>
      )}

      {/* 3 · puntos: nueve puntos en tres filas; las esquinas y el centro son blancos/detalle */}
      {numPatron === 3 && (
        <>
          <g fill={colorDetalle}>
            <circle cx="22.7" cy="22.7" r="9.1" />
            <circle cx="77.3" cy="22.7" r="9.1" />
            <circle cx="50" cy="50" r="9.1" />
            <circle cx="22.7" cy="77.3" r="9.1" />
            <circle cx="77.3" cy="77.3" r="9.1" />
          </g>
          <g fill={figura}>
            <circle cx="50" cy="22.7" r="9.1" />
            <circle cx="22.7" cy="50" r="9.1" />
            <circle cx="77.3" cy="50" r="9.1" />
            <circle cx="50" cy="77.3" r="9.1" />
          </g>
        </>
      )}
    </svg>
  );
}
