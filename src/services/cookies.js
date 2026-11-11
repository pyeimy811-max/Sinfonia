export function leerCookie(nombre) {
  const prefijo = `${nombre}=`;
  const cookie = document.cookie
    .split("; ")
    .find((v) => v.startsWith(prefijo));
  return cookie ? decodeURIComponent(cookie.slice(prefijo.length)) : null;
}

export function guardarCookie(nombre, valor, dias = 180) {
  const maxAge = dias * 24 * 60 * 60;
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function borrarCookie(nombre) {
  document.cookie = `${nombre}=; Path=/; Max-Age=0; SameSite=Lax`;
}