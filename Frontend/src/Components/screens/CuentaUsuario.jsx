import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import React, { useEffect } from "react";
import styles from "../styles/cuentaUsuario.module.css";
function CuentaUsuario() {
  const { user } = useAuth();

  useEffect(() => {
    // Obtener la tabla y sus celdas
    const tabla = document.getElementById("citas");

    console.log("user es:", user);
    tabla.rows[1].cells[0].innerText = user.nombres;
    tabla.rows[1].cells[1].innerText = user.apellidos;
    tabla.rows[1].cells[2].innerText = user.cedula;
    tabla.rows[1].cells[3].innerText = user.fecha
      .split("T")
      .shift()
      .replaceAll("-", "/");
    tabla.rows[1].cells[4].innerText = user.email;
    tabla.rows[1].cells[5].innerText = user.username;
    tabla.rows[1].cells[6].innerText = user.celular;
  });

  return (
    <div>
      <a name="arriba"></a>
      <header>
        <center>
          <h1>Cuenta de usuario</h1>
        </center>
      </header>
      <center>
        <table role="table" id="citas">
          <thead role="rowgroup">
            <tr>
              <th role="columnheader">Nombres</th>
              <th role="columnheader">Apellidos</th>
              <th role="columnheader">Cédula</th>
              <th role="columnheader">Fecha de nacimiento</th>
              <th role="columnheader">Correo</th>
              <th role="columnheader">Usuario</th>
              <th role="columnheader">Celular</th>
            </tr>
          </thead>
          <tbody role="rowgroup">
            <tr role="row" className={styles.tablaUsuario}>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
              <td role="cell"></td>
            </tr>
          </tbody>
        </table>
        <br />
      </center>
      <center>
        {/* PARA EL LOCAL STORAGE:<button id="botonContrasena" className={styles.botonContrasena}>
          Cambiar contraseña
        </button> */}
        <Link className={styles.botonContrasena} to={"/cambiarContrasena"}>
          Actulizar datos y contraseña
        </Link>
      </center>
      <center>
        <nav className="nav_botonera">
          <center>
            <Link
              className="btn btn-outline-primary btn_botonera btn_botonera"
              to={"/citasGeneral"}
            >
              Agendar cita
            </Link>
            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/citasGeneralUser"}
            >
              Cancelar cita
            </Link>
            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/servicios"}
            >
              Servicios
            </Link>
            <Link
              className="btn btn-outline-primary btn_botonera"
              to={"/contactForm"}
            >
              Contacto
            </Link>
          </center>
        </nav>
      </center>
      <center>
        <footer className="footer_botonera">
          <center>
            <button
              className="botonLargo"
              onClick={() => window.history.back()}
            >
              Volver
            </button>
          </center>
          <center>
            <p>
              <h5>Desarrollado por Jonnathan Monroy</h5>
            </p>
          </center>
        </footer>
      </center>
      <script src="../js/cuenta.js"></script>
    </div>
  );
}

export default CuentaUsuario;
