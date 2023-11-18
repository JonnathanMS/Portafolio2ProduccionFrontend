import React, { useState, useEffect } from "react";
import styles from "../styles/scrollUp.module.css";
const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar o ocultar el botón basado en la posición del scroll
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // console.log("El scroll va en", scrollTop);
    setIsVisible(scrollTop > 100); // Aqui ajustamos la altura del scroll en que queremos que aparezca
  };

  // Adjuntar/desadjuntar el evento de desplazamiento al montar/desmontar el componente
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para desplazarse hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Añade un desplazamiento suave (opcional)
    });
  };

  return (
    <button
      className={`${styles.scroll_to_top_btn} ${
        isVisible ? styles.visible : ""
      }`}
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
};

export default ScrollUp;
