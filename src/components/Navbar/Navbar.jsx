import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Navbar.css";
import Icono from "../Icono";
import Logo from "../../assets/logo.svg";
import { PanelAccesibilidad } from "../PanelAccesibilidad/PanelAccesibilidad.jsx";
const DESTINOS_INVITADO = {
  inicio: "#inicio",
  catalogo: "#catalogo",
};


const Navbar = ({
  textos,
  cargando,
  cambiarIdioma,
  activo,
  error,
  recargar,
  idioma,
  onBuscar,
}) => {
  const [abierto, setAbierto] = useState(false); //Saber si el toogle de mobile esta abierto
  const [accesibilidadAbierta, setAccesibilidadAbierta] = useState(false);
  const [posicionPanel, setPosicionPanel] = useState({ top: 80, right: 16 });
  const [busqueda, setBusqueda] = useState(""); //sin valor a buscar
  const botonMenu = useRef(null);
  const botonAccesibilidad = useRef(null);
  const campoBusqueda = useRef(null);
  const nav = textos?.navbar;
  const ingles = idioma === "en"; 
  const abrir =
    textos?.menuMovil.abrir ?? (ingles ? "Open menu" : "Abrir menu");
  const cerrar =
    textos?.menuMovil.cerrar ?? (ingles ? "Close menu" : "Cerrar menu");
  const enlacesInvitado = Object.entries(nav?.enlaces ?? {}).filter(
    ([clave]) => DESTINOS_INVITADO[clave],
  );
  //convierte objeto en un arreglo de pares

  useEffect(() => {
    function cerrarConEscape(evento) {
      if (evento.key !== "Escape") return;
      if (accesibilidadAbierta) {
        setAccesibilidadAbierta(false);
        botonAccesibilidad.current?.focus();
      } else if (abierto) {
        setAbierto(false);
        botonMenu.current?.focus();
      }
    }
    document.addEventListener("keydown", cerrarConEscape); //Escucha las teclas en todo el documento
    return () => document.removeEventListener("keydown", cerrarConEscape);
  }, [abierto, accesibilidadAbierta]);

  useEffect(() => {
    if (!accesibilidadAbierta) return;

    function actualizarPosicionPanel() {
      const boton = botonAccesibilidad.current;
      if (!boton) return;
      const rect = boton.getBoundingClientRect();
      setPosicionPanel({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }

    actualizarPosicionPanel();
    window.addEventListener("resize", actualizarPosicionPanel);
    window.addEventListener("scroll", actualizarPosicionPanel, true);
    return () => {
      window.removeEventListener("resize", actualizarPosicionPanel);
      window.removeEventListener("scroll", actualizarPosicionPanel, true);
    };
  }, [accesibilidadAbierta]);


  return (
    <header className="navbar ">
      <nav
        className="navbar-interior"
        aria-label={nav?.aria.navegacion ?? "Navegación Principal"}
      >
        <a
          href="#inicio"
          className="navbar-marca"
          aria-label={nav?.logo.aria ?? "Inicio"}
          onClick={() => setAbierto(false)}
        >
          <img src={Logo} alt="Logo de sintonia" />
        </a>

        <div className="navbar-movil-acciones">
          {!abierto && (
            <button type="button" className="navbar-ingresar-movil ">
              {nav?.botones?.invitado?.ingresar}
            </button>
          )}
          <button
            type="button"
            ref={botonMenu}
            className="navbar-icono"
            aria-label={abierto ? cerrar : abrir}
            aria-expanded={abierto}
            aria-controls="navbar-panel"
            onClick={() => setAbierto((valor) => !valor)}
          >
            <Icono nombre={abierto ? "cerrar" : "menu"} />
          </button>
        </div>
        <div
          id="navbar-panel"
          className={`navbar-panel${abierto ? " is-abierto" : ""}`}
          aria-busy={cargando}
        >
          {cargando && (
            <p className="navbar-estado" role="status">
              {ingles ? "Loading navigation…" : "Cargando navegación…"}
            </p>
          )}
          {error && (
            <div className="navbar-estado" role="alert">
              <p>
                {ingles
                  ? "Navigation could not be loaded."
                  : "No pudimos cargar el menú."}
              </p>
              <button type="button" onClick={recargar}>
                {ingles ? "Try again" : "Reintentar"}
              </button>
            </div>
          )}
          {nav && (
            <>
              <ul className="navbar-enlaces">
                {enlacesInvitado.map(([clave, etiqueta]) => (
                  <li key={clave}>
                    <a
                      href={DESTINOS_INVITADO[clave]}
                      aria-current={activo === clave ? "page" : undefined}
                      onClick={() => setAbierto(false)}
                    >
                      {etiqueta}
                    </a>
                  </li>
                ))}
              </ul>
  
            </>
          )}

          <div className="navbar-utilidades">
            
            <div className="navbar-utilidad-fila">
              <span>{textos?.menuMovil?.secciones?.idioma}</span>
               <div className="navbar-idiomas-movil">
                <label className="navbar-idioma">
                  <button
                  type="button"
                  className="navbar-idioma-boton-es"
                  aria-pressed={idioma==="es"}
                  onClick={() => cambiarIdioma("es")}
                >
                  ES
                </button>
                <button
                  type="button"
                  className="navbar-idioma-boton-en"
                  aria-pressed={idioma==="en"}
                  onClick={() => cambiarIdioma("en")}
                >
                  EN
                </button>
                </label>
                
                </div>
                

            </div>
            <button
              ref={botonAccesibilidad}
              className="navbar-accesibilidad"
              type="button"
              aria-label={
                ingles ? "Accessibility options" : "Opciones de accesibilidad"
              }
              aria-expanded={accesibilidadAbierta}
              aria-controls="panel-accesibilidad"
              onClick={() =>
                setAccesibilidadAbierta((valor) => !valor)
              }
            >
              <span>{textos?.menuMovil?.secciones.accesibilidad}</span>
              <div className="navbar-accesibilidad-movil"><Icono nombre="accesibilidad" /></div>
              
            </button>
          </div>
          <div className="navbar-sesion">
            <button
              href="#ingresar"
              type="submit"
              className="navbar-invitado-ingresar "
              onClick={() => setAbierto(false)}
            >
              {nav?.botones?.invitado?.ingresar}
            </button>
            <a
              href="#crear-cuenta"
              className="navbar-invitado-crear-cuenta "
              onClick={() => setAbierto(false)}
            >
              {nav?.botones?.invitado?.crearCuenta}
            </a>
          </div>
        </div>
      </nav>
      {accesibilidadAbierta &&
        createPortal(
          <div
            className="navbar-panel-accesibilidad"
            style={{
              "--panel-top": `${posicionPanel.top}px`,
              "--panel-right": `${posicionPanel.right}px`,
            }}
          >
            <PanelAccesibilidad
              textos={textos}
              onClose={() => {
                setAccesibilidadAbierta(false);
                botonAccesibilidad.current?.focus();
              }}
            />
          </div>,
          document.body,
        )}
    </header>
  );
};

export default Navbar;
