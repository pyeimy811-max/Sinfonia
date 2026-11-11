import { useEffect, useState } from "react";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1";

export function useGeneros() {
  const [generos, setGeneros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      try {
        const respuesta = await fetch(`${API}/generos`);
        if (!respuesta.ok) throw new Error(respuesta.status);
        const json = await respuesta.json();
        if (activo) setGeneros(json.datos ?? []);
      } catch {
        if (activo) setError(true);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, []);

  return { generos, cargando, error };
}