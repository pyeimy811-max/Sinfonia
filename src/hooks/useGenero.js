// hooks/useGenero.js
import { useEffect, useState } from "react";

const API = "https://yanethm-sintonia-api.fly.dev/api/v1";

export function useGenero(id) {
  const [detalle, setDetalle] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setDetalle(null);
      return;
    }
    const controlador = new AbortController();
    setCargando(true);
    setError(false);

    fetch(`${API}/generos/${id}`, { signal: controlador.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const datos = json?.datos ?? json;
        setDetalle(datos);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      })
      .finally(() => setCargando(false));

    return () => controlador.abort();
  }, [id]);

  return { detalle, cargando, error };
}