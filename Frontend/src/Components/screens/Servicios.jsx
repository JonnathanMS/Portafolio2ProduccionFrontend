import React, { useState } from "react";

const Servicios = () => {
  const [selectedVideo, setSelectedVideo] = useState("");
  const [titleVideo, setTitleVideo] = useState("");

  const handleVideoSelect = (event) => {
    let selectedVideo = event.target.value;
    let titleVideo = event.target.allow;
    if (selectedVideo == "NoSelection") selectedVideo = false;
    setSelectedVideo(selectedVideo);
    setTitleVideo(titleVideo);
  };

  return (
    <div>
      <section id="videos" className="section iframe-contenedor">
        <div className="textBox iframe-contenedor adjust">
          <center>
            <h6 style={{ margin: "0 1.5rem", fontWeight: "bold" }}>
              Presentacion y explicacion de Portafolios:
            </h6>
            <p
              style={{
                margin: "0 1.5rem",
                textAlign: "center",
                color: "white",
              }}
            >
              En los siguientes videos presento y explico mis portafolios y
              métodos. En caso de cualquier consulta puedes contactarme a mi
              correo o whatsapp en la opción Contáctame.
            </p>
          </center>

          {/* Lista desplegable con opciones de videos */}
          <select
            value={selectedVideo}
            onChange={handleVideoSelect}
            className="transparent-input"
          >
            <option value="NoSelection" title="No selection">
              Selecciona un video
            </option>
            <option
              value="https://www.youtube.com/embed/5ox9MNQqrb0"
              title="Node, express, javascript"
            >
              Node, express, javaScript.
            </option>
            <option
              value="https://www.youtube.com/embed/9Yu0clIsOOU"
              title="React, framework Vite"
            >
              React, framework Vite
            </option>
            <option
              value="https://www.youtube.com/embed/YI6hTwrWarI"
              title="Java"
            >
              Java
            </option>
            <option
              value="https://www.youtube.com/embed/wmJ-jyBCo0k"
              title="SQL"
            >
              SQL
            </option>
            <option
              value="https://www.youtube.com/embed/ZcKH9b4mlWk"
              title="Mongoose"
            >
              Mongoose
            </option>
            <option
              value="https://www.youtube.com/embed/l_hxsfd9Uto"
              title="Mongoose"
            >
              Python
            </option>
            <option
              value="https://www.youtube.com/embed/_x7Cs3Wu7L0"
              title="Responsividad, bootstrap, animaciones"
            >
              Responsividad, bootstrap, animaciones
            </option>
            {/* Agrega más opciones de video aquí */}
          </select>
          {/* Div para reproducir el video */}
          <div id="videoContainer" className="div-iframe">
            {selectedVideo && (
              <iframe
                className="iframe-responsivo"
                src={selectedVideo}
                title={titleVideo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicios;
