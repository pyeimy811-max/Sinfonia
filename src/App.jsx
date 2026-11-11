import { useTextos } from "./hooks/useTextos.js";
import { useAlbumes } from "./hooks/useALbumes.js";
import { useGeneros } from "./hooks/useGeneros.js";
import { leerCookie } from "./services/cookies.js";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HeroSintonia from "./components/HeroSintonia/HeroSintonia.jsx";
import SeccionAlbumes from "./components/SeccionesAlbumes/SeccionesAlbumes.jsx";
import SeccionGeneros from "./components/SeccionGeneros/SeccionGeneros.jsx";
import PortadaAlbum from "./components/PortadaAlbum/PortadaAlbum.jsx";
import InvitacionRegistro from "./components/InvitacionRegistro/InvitacionRegistro.jsx";
import BannerCookies from "./components/BannerCookies/BannerCookies.jsx";
import Catalogo from "./pages/Catalogo/Catalogo.jsx";
import { useEffect, useState } from "react";

function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

function App() {
  // Idioma por defecto español
  const [idioma, setIdioma] = useState(() => {
    return leerCookie("idioma") === "en" ? "en" : "es";
  });
  const [activo, setActivo] = useState(leerSeccion);
  const datos = useTextos(idioma);
  const {albumes, cargando: cargandoAlbumes, error: errorAlbumes} = useAlbumes();
  const { generos } = useGeneros();

  const ingles = idioma === "en";
  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
      
    }
    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  function abrirAlbum(album) {
    const tituloAlbum = album.titulo || album.nombre;
    const nombreArtista = album.artista?.nombre || album.artista;
    const nombreGenero = album.genero?.nombre || album.genero;
    const variantePortada = album.portada?.patron ?? album.arte;

    setDetalle({
      titulo: tituloAlbum,
      descripcion: `${nombreArtista} · ${nombreGenero}`,
      contenido: <PortadaAlbum variante={variantePortada} />,
      cerrar: ingles ? "Close" : "Cerrar",
    });
  }

  return (
    <>
      <Navbar
        {...datos}
        idioma={idioma}
        cambiarIdioma={setIdioma}
        activo={activo}
        
      />
      {activo === "catalogo" ? (
        <Catalogo datos={datos} generos={generos} albumes={albumes} onSeleccionarAlbum={abrirAlbum} />
      ) : (
        <>
          <HeroSintonia {...datos} totalGeneros={generos.length} />
          <SeccionAlbumes
            {...datos}
            albumes={albumes}
            error={errorAlbumes}
            filaHorizontalMovil
            onSeleccionar={abrirAlbum}
          />
          <SeccionGeneros
            {...datos}
            generos={generos}
          />
          <InvitacionRegistro {...datos} />
        </>
      )}
      <BannerCookies {...datos} idioma={idioma} />
      <Footer {...datos} idioma={idioma} />
    </>
  );
}

export default App;
