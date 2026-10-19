import React from "react";
import semCapa from "./assets/sem-capa.png"; // fallback local

function Capa({ src }) {
  return (
    <img
      src={src}
      alt="capa"
      onError={(e) => {
        e.target.onerror = null; // evita loop infinito
        e.target.src = semCapa;  // usa imagem local
      }}
    />
  );
}

export default Capa;
