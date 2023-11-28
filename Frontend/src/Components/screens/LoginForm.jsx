import styles from "../styles/login.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Message from "../crud/Message.jsx";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Loader from "../crud/Loader.jsx";
import {
  setTimeOutFunction,
  clearTimeOutFunction,
} from "../../hooks/setTime.js";

function LoginForm() {
  const navigate = useNavigate(); // Obtiene la instancia de history para la redirección
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [intentos, setIntentos] = useState(3);
  const [loading, setLoading] = useState(false);
  const { signin, errors: SigninErrors, isAuthenticated } = useAuth();

  const handleEyeIconClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const objDatosLogin = Object.fromEntries(formData.entries());
    const data = {
      email: objDatosLogin.email,
      password: objDatosLogin.password,
    };

    signin(data);
    setLoading(true);
    setIntentos(intentos - 1);
    if (intentos == 1) {
      alert(
        "Ya has gastado 3 intentos incorrectos, intenta nuevamente más tarde."
      );
    }
  };
  useEffect(() => {
    setTimeOutFunction(
      loading,
      setLoading,
      "El servidor esta un poco lento. Por fabor intenta nuevamente."
    );
  }, [loading]);

  useEffect(() => {
    clearTimeOutFunction();
    setLoading(false);
  }, [SigninErrors]);

  //   console.log("is authenticated?: ", isAuthenticated);
  useEffect(() => {
    // redirige si el usuario ya está autenticado.
    if (isAuthenticated) {
      clearTimeOutFunction();
      navigate("/inicio");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <center>
        <div className={styles.formu}>
          <br />
          <h2>Iniciar Sesión</h2>
          {loading && <Loader />}
          {SigninErrors.map((error, i) => (
            <Message msg={error} bgColor="red" key={i} />
          ))}
          <form className={styles.login_form} onSubmit={handleLogin}>
            <input type="text" placeholder="Correo" id="Correo" name="email" />
            <br />
            <br />
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

            <button
              className="botonLargo"
              disabled={intentos < 1}
              type="submit"
            >
              {intentos > 0 ? "Iniciar Sesion" : "Intente más tarde"}
            </button>
          </form>
          <h5 id="intentosRestantesP">
            Intentos restantes: <span>{intentos}</span>
          </h5>
          <div className={styles.registro}>
            <Link className={styles.link} to={"/registro"}>
              No tengo cuenta
            </Link>
          </div>
          <center>
            <button
              className="btn-block botonLargo"
              type="button"
              onClick={() => window.history.back()}
            >
              Volver
            </button>
          </center>
        </div>
      </center>
    </div>
  );
}

export default LoginForm;
