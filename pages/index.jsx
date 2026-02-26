import React from "react";

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Original Kids</h1>
      <p>Loja de roupas infantis</p>

      <a
        href="https://wa.me/5519992024758"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          textDecoration: "none",
          borderRadius: 5
        }}
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}
