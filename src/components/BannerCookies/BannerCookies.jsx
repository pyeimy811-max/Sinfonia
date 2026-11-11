import { useState, useEffect } from "react";
import { leerCookie, guardarCookie, borrarCookie } from "../../services/cookies.js";
import "./BannerCookies.css";

export default function BannerCookies({ textos, idioma }) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const estado = leerCookie("consentimiento");
    if (!estado) {
      setVisible(true);
    }
  }, []);

  const responder = (aceptado) => {
    const valorConsentimiento = aceptado ? "aceptado" : "rechazado";
    
    // 1. Guardar el consentimiento
    guardarCookie("consentimiento", valorConsentimiento);
    
    // 2. Lógica para guardar o borrar el idioma según la decisión
    if (aceptado) {
      guardarCookie("idioma", idioma);
    } else {
      borrarCookie("idioma");
    }

    setVisible(false);
  };

  if (!visible) return null;

  const banner = textos?.cookies?.banner;

  return (
    <aside className="banner-cookies-simple" aria-label="Aviso de cookies">
      <div className="banner-cookies-contenido">
        <div className="banner-cookies-texto">
          <h3>{banner?.titulo}</h3>
          <p>{banner?.texto}</p>
        </div>
        <div className="banner-cookies-acciones">
          <button className="boton-cookie secundario" onClick={() => responder(false)}>
            {banner?.botones?.rechazar}
          </button>
          <button className="boton-cookie primario" onClick={() => responder(true)}>
            {banner?.botones?.aceptar}
          </button>
        </div>
      </div>
    </aside>
  );
}