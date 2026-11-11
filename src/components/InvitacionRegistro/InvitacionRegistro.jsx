import "./InvitacionRegistro.css";
export default function InvitacionRegistro({textos, abrirCuenta }) {
    const inv=textos?.paginas?.inicioPublico?.cta ;
  return (
    <section className="ancho-home registro-sintonia">
      <div>
        <h2>
          {inv?.titulo}
        </h2>
        <p>
          {inv?.texto}
        </p>
      </div>
      <button className="boton-home" onClick={() => abrirCuenta("registro")}>
        {inv?.botones.crearCuentaGratis}
      </button>
    </section>
  );
}
