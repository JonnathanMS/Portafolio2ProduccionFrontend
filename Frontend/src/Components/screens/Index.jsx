import styles from "../styles/index.module.css";
// import { Link } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom"; // Importa useHistory para la redirección
import { useEffect } from "react";

const Index = () => {
  const { isAuthenticated } = useAuth(); // errors fue renombrado con : para evitar conflictos en otras secciones.
  const navigate = useNavigate(); // Obtiene la instancia de history para la redirección

  useEffect(() => {
    // redirige si el usuario ya esta auntenticado.
    if (isAuthenticated) navigate("/inicio");
  }, [isAuthenticated]);
  return (
    <div>
      <header className={styles.header}>
        <center>
          <h1 className="backgTextLight">Bienvenido a Virtual-tutor</h1>
        </center>
      </header>
      <center>
        <img
          className={styles.imgIndex}
          src="../../public/images/deEspalda.jpg"
          alt="logo"
        ></img>
      </center>
      <center>
        <nav className="nav_botonera">
          <center>
            <Link
              to="/servicios"
              className="btn btn-outline-primary btn_botonera"
            >
              Video Presentación
            </Link>
            <Link
              to="/contactForm"
              className="btn btn-outline-primary btn_botonera"
            >
              email-whatsApp
            </Link>
          </center>
        </nav>
      </center>
      <Outlet></Outlet>

      <footer className="footer_botonera">
        <center>
          <h5>Administración de citas de tutoría por Jonnathan Monroy</h5>
          <p>
            Para ver todas las funcionalidaes por favor registra un usuario y
            logueate
          </p>
        </center>
      </footer>
    </div>
  );
};

export default Index;
