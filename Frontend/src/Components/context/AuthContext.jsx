import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  updatePasswordRequest,
} from "../../api/auth";
import Cookies from "js-cookie"; // Permite leer las cookies

export const AuthContext = createContext();

export const useAuth = () => {
  // con esto podemos usar authContext y useContext con una sola importacion
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado con un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Este es el usuario que podra usarse dentro de todo el contexto. Cuando ejecutemos un register o un login el setUser sera modificado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // con esta variable de estado validamos la autenticacion
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log("esto es el res", res.data);
      setUser(res.data); // establece en la variable de estado lo que vino en la respuesta en el data.
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message); // esta es la ubicacion del error en el json que viene como respuesta.
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data); // establece en la variable de estado lo que vino en la respuesta en el data.
      //   return res;
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        // validamos si la respuesta viene en un array porque si no es asi lo metemos luego en un array para que no genere error.
        return setErrors(error.response.data.message);
      } else {
        return setErrors([error.response.data.message]);
      }
    }
  };

  const verificarContrasena = async (user) => {
    try {
      const res = await updatePasswordRequest(user);
      console.log("verficarContraseña res: ", res);
      if (res.status === 200) {
        alert("Datos Actulizados, Inicie sesion con los nuevos datos.");
        logout();
      }
    } catch (error) {
      //   console.log(error.response.data);
      if (Array.isArray(error.response.data)) {
        // validamos si la respuesta viene en un array porque si no es asi lo metemos luego en un array para que no genere error.
        return setErrors(error.response.data.message);
      } else {
        return setErrors([error.response.data.message]);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  // quitamos el mensaje de error luego de unos segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer); // con esto quitamos el intervalo si ya el usuario no esta en la pagina
    }
  }, [errors]);

  //*Descomentar para ver las cookies
  //   useEffect(() => {
  //     const cookies = Cookies.get(); // obtiene las cookies para leerlas
  //     // console.log("cookies:", cookies);
  //     if (cookies.token) {
  //       // si existe el elemento token en las cookies
  //         // console.log(cookies.token);
  //     }
  //   }, []);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get(); // obtiene las cookies para leerlas
      // si existe el elemento token en las cookies hace el llamado axios
      if (cookies.token) {
        try {
          const res = await verifyTokenRequest(cookies.token); // llamado axios
          console.log(res);
          // si la respuesta trae los datos del usuario es porque si existe en la base de datos
          if (!res.data) {
            // si la respuesta no trae la data pasa la autenticacion a false.
            setIsAuthenticated(false);
            setLoading(false);
          } else {
            // si la respuesta trae la data la establece para que sea accesible al contexto.
            setLoading(false);
            setIsAuthenticated(true);
            setUser(res.data); // si la respuesta trae los datos del usuario es porque si existe en la base de datos
          }
        } catch (error) {
          setLoading(false);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
    }
    checkLogin();
  }, []);

  // en este valor de value podemos poner cualquier cosa, array, string, num
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        verificarContrasena,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
