import React, { useState } from "react";
import styles from "../styles/registro.module.css";
// import { registerRequest } from "../../api/auth";  // se usa en AuthContext.jsx
// import { useNavigate } from "react-router-dom"; // Importa useHistory para la redirección
import Loader from "../crud/Loader.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import Message from "../crud/Message";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CambiarContrasena() {
  const expRegNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const expRegCorreo = /^\w+@(\w+\.)+\w{2,4}$/;
  const { user, verificarContrasena, errors: RegisterErrors } = useAuth(); // errors fue renombrado con : para evitar conflictos en otras secciones.
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  //   const navigate = useNavigate(); // Obtiene la instancia de history para la redirección
  const handleEyeIconClick = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleEyeIconClick1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };

  useEffect(() => {
    // Este código se ejecutará después de que se cargue el DOM
    document.getElementById("nombres").value = user.nombres;
    document.getElementById("apellidos").value = user.apellidos;
    document.getElementById("fecha").value = user.fecha.split("T").shift();
    document.getElementById("celular").value = user.celular;
    document.getElementById("cedula").value = user.cedula;
    document.getElementById("usuario").value = user.username;
    document.getElementById("correo").value = user.email;
  }, []); // se ejecutará una vez después de montar el componente completo.

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Simulando validación y almacenamiento de datos
    const guardar = Array.from(formData.values()).every(
      (value) => value !== ""
    );
    if (guardar) {
      const objDatosUpdate = Object.fromEntries(formData.entries());
      objDatosUpdate.citas = [];
      objDatosUpdate.antiguoEmail = user.email;
      //   objDatosUpdate.fecha = objDatosUpdate.fecha + "T00:00:00.000Z";
      objDatosUpdate.fecha = dayjs.utc(objDatosUpdate.fecha).format();
      //   console.log(objDatosUpdate);

      if (!expRegNombre.exec(objDatosUpdate.nombres))
        return alert("Los nombre deben contener letras y no tener números.");
      if (!expRegNombre.exec(objDatosUpdate.apellidos))
        return alert("Los Apellidos deben contener letras y no tener números.");
      if (!expRegCorreo.exec(objDatosUpdate.email))
        return alert("El email no está bien escrito.");
      if (
        (objDatosUpdate.password1.length < 6) |
        (objDatosUpdate.password2 < 6)
      )
        return alert("El password debe tener mínomo 6 cáracteres.");
      if (objDatosUpdate.password1 != objDatosUpdate.password2) {
        return alert(
          "La contraseña nueva no coincide, por favor repitala en ambos campos exactamente igual."
        );
      } else {
        objDatosUpdate.password = objDatosUpdate.password1;
        delete objDatosUpdate.password1;
        delete objDatosUpdate.password2;
      }
      alert(`Datos ingresados correctamente:
        Nombre: ${objDatosUpdate.nombres}
        Apellidos: ${objDatosUpdate.apellidos}
        Cédula:${objDatosUpdate.cedula}
        Fecha: ${objDatosUpdate.fecha}
        Correo: ${objDatosUpdate.email}
        Celular:${objDatosUpdate.celular}
        Usuario:${objDatosUpdate.username}
        citas:${objDatosUpdate.citas};
        `);
      // Convertir el objeto a JSON y guardar en el almacenamiento local
      //   localStorage.setItem("DatosRegistro", JSON.stringify(objDatosUpdate));
      // Redirigir a LoginbiForm después de guardar los datos
      //   const res = await registerRequest(objDatosUpdate); // se ejcuta en AuthContext.jsx
      //   if (res) {
      //     // console.log("esto es el res", res);
      //     navigate("/login"); // Cambia '/login'
      //   }
      //   console.log(RegisterErrors, RegisterErrors.length);
      //   if (isAuthenticated) {
      //     navigate("/login"); // Cambia '/login'
      //   }
      console.log("objetoDatosUpdate: ", objDatosUpdate, RegisterErrors);
      verificarContrasena(objDatosUpdate); // aqui estamos haciendo el proceso de registro de usuario usando AuthContext.jsx
      setLoading(true);
    } else {
      alert("No puede haber campos vacíos");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="../html/login.html" id="form1">
        {/* <form id="form1"> */}
        <center>
          <div className={styles.form_box}>
            <h1 className="backgTextLightForm">Actualización de datos:</h1>
            <br />
            {loading && <Loader />}
            {RegisterErrors.map((error, i) => (
              <Message msg={error} bgColor="red" key={i}></Message>
            ))}
            <div className={styles.panel_izquierdo}>
              <label className="backgTextLightForm">Nombres </label>
              <input
                type="text"
                placeholder="Ingrese su Nombre"
                id="nombres"
                name="nombres"
              />

              <label className="backgTextLightForm">Fecha</label>
              <input
                type="date"
                name="fecha"
                min="1900-01-01"
                max="2024-12-31"
                id="fecha"
              />
              <label className="backgTextLightForm">Cédula</label>
              <input
                type="number"
                placeholder="ingrese su numero de Cedula"
                id="cedula"
                name="cedula"
              />
              <label className="backgTextLightForm">Usuario</label>
              <input
                type="text"
                placeholder="ingrese su usuario de acceso"
                id="usuario"
                name="username"
              />
              <label className="backgTextLightForm">Correo Electrónico</label>
              <input
                type="text"
                placeholder="ingrese su correo Electrónico"
                id="correo"
                name="email"
              />
            </div>
            <div className={styles.panel_derecho}>
              <label className="backgTextLightForm">Apellidos</label>
              <input
                type="text"
                placeholder="ingrese sus Apellidos"
                id="apellidos"
                name="apellidos"
              />
              <label className="backgTextLightForm">Celular</label>
              <input
                type="number"
                placeholder="Ingrese Celular"
                id="celular"
                name="celular"
              />

              {/* ¿Aqui empieza el eye icon */}
              <label className="backgTextLightForm">Contraseña Actual</label>
              <div className={styles.login_ojo}>
                <input
                  type={passwordVisible1 ? "text" : "password"}
                  id="contrasena"
                  name="antiguoPassword"
                  placeholder="Contraseña Actual"
                />
                <span
                  className={styles.login_icon_eye}
                  onClick={handleEyeIconClick1}
                >
                  {passwordVisible1 ? (
                    <BsFillEyeFill />
                  ) : (
                    <BsFillEyeSlashFill />
                  )}
                </span>
              </div>
              <label className="backgTextLightForm">Contraseña nueva</label>
              <div className={styles.login_ojo}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="contrasena1"
                  name="password1"
                  placeholder="Contraseña"
                />
                <span
                  className={styles.login_icon_eye}
                  onClick={handleEyeIconClick}
                >
                  {passwordVisible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </span>
              </div>
              <label className="backgTextLightForm">
                Repite la contraseña nueva
              </label>
              <div className={styles.login_ojo}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="contrasena2"
                  name="password2"
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

export default CambiarContrasena;
