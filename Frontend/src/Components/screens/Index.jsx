import styles from "../styles/index.module.css";
// import { Link } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom"; // Importa useHistory para la redirección
import { useEffect } from "react";
import logo from "../../images/logon.JPG";

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
        <img className={styles.imgIndex} src={logo} alt="logo"></img>
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
          <h5>Importante:</h5>
          <p>
            Para ver todas las funcionalidades registra un nuevo usuario, o si
            prefieres ver un usuario pre establecido ingresa con correo:
            ensayo@hotmail.com contraseña:1234567 Este sitio lo he desarrollado
            con React y vite en el front, y con Nodejs y express en el Backend:
            Has{" "}
            <Link to="/servicios" style={{ color: "white" }}>
              click aquí
            </Link>{" "}
            para ver la presentación.
          </p>
        </center>
      </footer>
    </div>
  );
};

export default Index;
