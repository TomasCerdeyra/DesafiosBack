import React from "https://esm.sh/react@18.2.0";
import Colores from "../dao/Colores.ts";

const colores = Colores.getInstance();

function Form() {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        />
        <meta charSet="utf-8" />
        <title>Desafio Deno</title>
      </head>
      <body
        style={{
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form action="/" method="post">
          <p style={{ color: "white" }}>Nombre de un color (en ingles)</p>
          <input type="text" name="color" autoFocus required />
          <button>Enviar</button>
        </form>
        <ul style={{ color: "white" }}>
          {colores.getColores().map((color: string) => {
            const isBlack = color.toLowerCase() === "black" ? "white" : color;
            return (
              <li style={{ color: isBlack }}>
                {color.toLowerCase() !== "black"
                  ? color
                  : `${color} - Se muestra blanco por el fondo`}
              </li>
            );
          })}
        </ul>
      </body>
    </html>
  );
}

export default Form;