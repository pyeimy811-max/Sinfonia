import "./Footer.css";
import Logo from "../../assets/logo.svg";

// Destinos de cada enlace. Las claves coinciden con las de la API (footer.columnas.*.enlaces)
const DESTINOS = {
  inicio: "#inicio",
  catalogo: "#catalogo",
  ingresar: "#ingresar",
  crearCuenta: "#crear-cuenta",
  terminos: "#terminos",
  accesibilidad: "#accesibilidad"
};

const Footer = ({ textos, idioma }) => {
  const pie = textos?.footer;
  const ingles = idioma === "en";

  // Sin textos todavía no hay nada que mostrar (el Navbar ya muestra el estado de carga/error)
  if (!pie) return null;

  const columnas = Object.entries(pie.columnas ?? {});
  const derechos = pie.legal?.derechos?.replace(
    "{anio}",
    new Date().getFullYear(),
  );

  return (
    <footer className="footer">
      <div className="footer-interior">
        <div className="footer-superior">
          <div className="footer-marca">
            <a
              href="#inicio"
              className="footer-logo"
              aria-label={textos?.navbar?.logo?.aria ?? "Inicio"}
            >
              <img src={Logo} alt="Logo de Sintonía" />
            </a>
            <p className="footer-lema">{pie.lema}</p>
          </div>

          <nav
            className="footer-columnas"
            aria-label={ingles ? "Footer" : "Pie de página"}
          >
            {columnas.map(([clave, columna]) => (
              <div className="footer-columna" key={clave}>
                <h2 className="footer-titulo">{columna.titulo}</h2>
                <ul className="footer-enlaces">
                  {Object.entries(columna.enlaces ?? {})
                    .filter(([id]) => DESTINOS[id])
                    .map(([id, etiqueta]) => (
                      <li key={id}>
                        <a href={DESTINOS[id]}>{etiqueta}</a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-inferior">
          <p className="footer-derechos">{derechos}</p>
          <p className="footer-nota">{pie.legal?.nota}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;