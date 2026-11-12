export const colorPortada = (clave) =>`var(--${String(clave).replace("/", "-")})`

export const formatearDuracion = (segundos = 0) => {
    const m = Math.floor(segundos/60)
    const s = String(segundos % 60).padStart(2, "0");
    return `${m}:${s};`
};
