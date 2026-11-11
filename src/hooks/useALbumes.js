import { useEffect, useState } from "react";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1";

export function useAlbumes({ orden = "populares", limite = 6 } = {}) {
  const [albumes, setAlbumes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(false);
      try {
        const params = new URLSearchParams({ orden, limite });
        const respuesta = await fetch(`${API}/albumes?${params}`, {
          signal: controlador.signal,
        });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const json = await respuesta.json();
        setAlbumes(json?.datos ?? json);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error al cargar álbumes:", err);
          setError(true);
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargar();
    return () => controlador.abort();
  }, [orden, limite]);

  return { albumes, cargando, error };
}