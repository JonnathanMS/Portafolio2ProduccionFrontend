import { Outlet, Link } from "react-router-dom";
import styles from "../styles/inicio.module.css";
import logo from "../../images/logon.JPG";
function Inicio() {
  return (
    <div>
      <a name="arriba"></a>
      <header className={styles.header}>
        <center>
          <h1 className={styles.title}>Bienvenido a Virtual-tutor</h1>
        </center>
      </header>
      <center>
        <img className={styles.imgIndex} src={logo} alt="logo"></img>
      </center>
      <center>
        <nav className="nav_botonera">
          <center>
            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/citasGeneralUser"}
            >
              Cancelar Citas
            </Link>
            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/citasGeneral"}
            >
              Agendar citas
            </Link>

            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/cuentaUsuario"}
            >
              Cuenta de usuario
            </Link>
            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/contactForm"}
            >
              Contacto
            </Link>

            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/servicios"}
            >
              videos
            </Link>
            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/crudApi"}
            >
              Mis tareas
            </Link>
          </center>
        </nav>
      </center>

      <center>
        <button className="botonLargo" onClick={() => window.history.back()}>
          Volver
        </button>
      </center>
    </div>
  );
}

export default Inicio;
