import React, { useState, useEffect } from "react";
import styles from "../styles/registro.module.css";
// import { registerRequest } from "../../api/auth";  // se usa en AuthContext.jsx
import { useNavigate } from "react-router-dom"; // Importa useHistory para la redirección
import { useAuth } from "../context/AuthContext.jsx";
import Message from "../crud/Message";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Loader from "../crud/Loader.jsx";

function RegistroForm() {
  const { signup, user, isAuthenticated, errors: RegisterErrors } = useAuth(); // errors fue renombrado con : para evitar conflictos en otras secciones.
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Obtiene la instancia de history para la redirección
  const [loading, setLoading] = useState(false);

  const handleEyeIconClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  //   console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const expRegNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const expRegCorreo = /^\w+@(\w+\.)+\w{2,4}$/;

    // Simulando validación y almacenamiento de datos
    const guardar = Array.from(formData.values()).every(
      (value) => value !== ""
    );
    if (guardar) {
      const objDatosRegistro = Object.fromEntries(formData.entries());
      objDatosRegistro.citas = [];
      // console.log(objDatosRegistro);
      if (!expRegNombre.exec(objDatosRegistro.nombres))
        return alert("Los nombre deben contener letras y no tener números.");
      if (!expRegNombre.exec(objDatosRegistro.apellidos))
        return alert("Los Apellidos deben contener letras y no tener números.");
      if (!expRegCorreo.exec(objDatosRegistro.email))
        return alert("El email no está bien escrito.");
      if (objDatosRegistro.password.length < 6)
        return alert("El password debe tener mínomo 6 carácteres");
      alert(`Datos ingresados correctamente:
        Nombre: ${objDatosRegistro.nombres}
        Apellidos: ${objDatosRegistro.apellidos}
        Cédula:${objDatosRegistro.cedula}
        Fecha: ${objDatosRegistro.fecha}
        Correo: ${objDatosRegistro.email}
        Celular:${objDatosRegistro.celular}
        Usuario:${objDatosRegistro.username}
        citas:${objDatosRegistro.citas};
        `);

      signup(objDatosRegistro); // aqui estamos haciendo el proceso de registro de usuario usando AuthContext.jsx
      setLoading(true);
    } else {
      alert("No puede haber campos vacíos");
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [RegisterErrors]);

  useEffect(() => {
    // redirige si el usuario ya esta auntenticado.
    if (isAuthenticated) navigate("/inicio");
  }, [isAuthenticated]);

  return (
    <>
      <form onSubmit={handleSubmit} action="../html/login.html" id="form1">
        {/* <form id="form1"> */}
        <center>
          <div className={styles.form_box}>
            <h1 className="backgTextLight">Formulario de registro:</h1>
            <br />
            {loading && <Loader />}
            {RegisterErrors.map((error, i) => (
              <Message msg={error} bgColor="red" key={i}></Message>
            ))}
            <div className={styles.panel_izquierdo}>
              <label className="backgTextLight">Nombres </label>
              <input
                type="text"
                placeholder="Ingrese su Nombre"
                id="nombres"
                name="nombres"
              />

              <label className="backgTextLight">Fecha</label>
              <input
                type="date"
                name="fecha"
                min="1900-01-01"
                max="2024-12-31"
                id="fecha"
              />
              <label className="backgTextLight">Cedula</label>
              <input
                type="number"
                placeholder="ingrese su numero de Cedula"
                id="cedula"
                name="cedula"
              />
              <label className="backgTextLight">Usuario</label>
              <input
                type="text"
                placeholder="ingrese su usuario de acceso"
                id="usuario"
                name="username"
              />
            </div>
            <div className={styles.panel_derecho}>
              <label className="backgTextLight">Apellidos</label>
              <input
                type="text"
                placeholder="ingrese sus Apellidos"
                id="apellidos"
                name="apellidos"
              />
              <label className="backgTextLight">Celular</label>
              <input
                type="number"
                placeholder="Ingrese Celular"
                id="celular"
                name="celular"
              />
              <label className="backgTextLight">Correo Electronico</label>
              <input
                type="text"
                placeholder="ingrese su correo Electronico"
                id="correo"
                name="email"
              />
              {/* ¿Aqui empieza el eye icon */}
              <label className="backgTextLight">Contraseña</label>
              <div className={styles.login_ojo}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="contrasena"
                  name="password"
                  placeholder="Contraseña"
                />
                <span
                  className={styles.login_icon_eye}
                  onClick={handleEyeIconClick}
                >
                  {passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </span>
              </div>
              {/* ¿Aqui termina el eye icon */}
            </div>
            <input type="submit" value="Continuar" className="botonLargo" />
            <input
              type="button"
              className="botonLargo"
              value="Volver"
              onClick={() => window.history.back()}
            />
            <br />
            <br />
          </div>
        </center>
      </form>
      {/* <script src="../js/registro.js"></script> */}
    </>
  );
}

export default RegistroForm;
