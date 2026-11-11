import PortadaAlbum from "../PortadaAlbum/PortadaAlbum.jsx";
import "./TarjetaGenero.css";

// Función auxiliar para determinar si un color hexadecimal es oscuro
function esColorOscuro(hex) {
  if (!hex || typeof hex !== "string") return false;
  const colorLimpio = hex.replace("#", "");
  
  // Si el hex es corto (#fff), convertirlo a largo (#ffffff)
  const fullHex = colorLimpio.length === 3
    ? colorLimpio.split("").map((c) => c + c).join("")
    : colorLimpio;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  // Fórmula estándar de luminosidad / brillo
  const brillo = (r * 299 + g * 587 + b * 114) / 1000;
  return brillo < 128; // Si el brillo es bajo, se considera fondo oscuro
}

export default function TarjetaGenero({
  nombre,
  idGenero,
  genero,
  filtrar,
  datosGenero,
}) {
  const textoNombre = typeof nombre === "object" ? nombre?.nombre : nombre;
  const valorId = idGenero || (typeof nombre === "object" ? nombre?.id : nombre);

  const valorGeneroActivo =
    typeof genero === "object" ? genero?.id || genero?.nombre : genero;
  const estaActivo =
    valorGeneroActivo === valorId || valorGeneroActivo === textoNombre;

  const objetoPortada =
    datosGenero?.portada || (typeof nombre === "object" ? nombre?.portada : null);

  const colorFondo = objetoPortada?.fondo;
  
  // Evaluamos si el fondo de la API es oscuro
  const esOscuro = esColorOscuro(colorFondo);

  return (
    <button
      className={`tarjeta-genero ${esOscuro ? "texto-claro" : ""}`}
      type="button"
      aria-pressed={estaActivo}
      onClick={() => filtrar(valorId || textoNombre)}
      style={colorFondo ? { backgroundColor: colorFondo } : undefined}
    >
      <span>{textoNombre}</span>
      <PortadaAlbum portada={objetoPortada} />
    </button>
  );
}