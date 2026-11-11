import Flecha from "../Flecha/Flecha.jsx";
import TarjetaGenero from "../TarjetaGenero/TarjetaGenero.jsx";
import "./SeccionGeneros.css";

function irAGenero(id) {
  const url = new URL(window.location.href);
  url.searchParams.set("genero", id);
  url.hash = "catalogo";
  window.history.pushState({}, "", url);
  // pushState no dispara hashchange, y Home escucha ese evento
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

function limpiarGenero() {
  const url = new URL(window.location.href);
  url.searchParams.delete("genero");
  window.history.replaceState({}, "", url);
}

export default function SeccionGeneros({
  textos,
  generos = [],
  genero,
  filtrar,
  esCatalogo = false,
}) {
  const datosSeccion = esCatalogo
    ? textos?.paginas?.catalogo?.generos
    : textos?.paginas?.inicioPublico?.generos;

  const titulo = datosSeccion?.titulo;
  const textoEnlace = datosSeccion?.enlaces?.verCatalogo;

  // En catálogo se alterna el género; en inicio se navega al catálogo
  const alSeleccionar = esCatalogo ? filtrar : irAGenero;

  return (
    <section
      className={`ancho-home seccion-generos${esCatalogo ? " seccion-generos-catalogo" : ""}`}
      id="generos"
      aria-labelledby="generos-titulo"
    >
      <div className="titulo-seccion">
        <h2 id="generos-titulo">{titulo}</h2>

        {!esCatalogo && textoEnlace && (
          <a className="enlace-home" href="#catalogo" onClick={limpiarGenero}>
            {textoEnlace} <Flecha />
          </a>
        )}
      </div>

      <div className="generos-grid">
        {generos.slice(0, esCatalogo ? 12 : 8).map((itemGenero, i) => {
          const idGen = itemGenero?.id || itemGenero;
          const nombreGen = itemGenero?.nombre || itemGenero;

          return (
            <TarjetaGenero
              key={idGen || i}
              nombre={nombreGen}
              idGenero={idGen}
              datosGenero={itemGenero}
              genero={esCatalogo ? genero : null}
              filtrar={alSeleccionar}
            />
          );
        })}
      </div>
    </section>
  );
}