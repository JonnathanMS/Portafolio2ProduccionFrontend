import { createContext, useContext, useState } from "react";
import { helpHttp } from "../../helpers/helpHttp.js";
import { useAuth } from "./AuthContext";

const FetchContext = createContext();

export const useFetchTasks = () => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("FetchTasks debe ser usado con un tasks provider");
  }
  return context;
};

export function FetchTaskProvider({ children }) {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const api = helpHttp(); //*usando el helper helpHTTP()
  const url = "http://localhost:4000/api/tasks"; ////Este es el endPoint la url donde esta alojada la api
  const urlLogin = "http://localhost:4000/api/login";
  // para que esto funcione tiene que estar levantado el servidor de json.server como el servidor de create reat app

  const login = (usuario) => {
    let options = {
      body: usuario,
      headers: { "content-type": "application/json" },
    };

    api.post(urlLogin, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        console.log("Estoy logueado");
      } else {
        setError(res);
        console.log("no hubo logueo");
      }
    });
  };

  const getData = () => {
    let options = {
      headers: { "content-type": "application/json" },
      credentials: "include",
    };

    api.get(url, options).then((res) => {
      console.log("Res desde FetchContext:", res);
      if (!res.ok) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
        console.error(res.statusText);
      }
    });
  };

  // GENERAMOS LOS DATOS NUEVOS CON FETCH POST Y LOS INSERTAMOS EN LA DB
  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
      credentials: "include",
    };

    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDb([...db, res]); // Uso  destructuracion para reescribir el objetoDB y actualizar la variable de estado
      } else {
        setError(res);
      }
    });
  };

  // USO FETCH  CON EL METODO PUT PARA ACTUALIZAR LOS DATOS
  const updateData = (data) => {
    let endpoint = `${url}/${data._id}`;
    //console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
      credentials: "include",
    };

    api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        let newData = db.map((el) => (el._id === data._id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  // USE FECH Y EL METODO  DEL PARA ELIMINAR LOS DATOS
  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    ); // validacion para estar seguros de eliminar los datos.

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
        credentials: "include",
      };

      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id); // usamos un método de filtrado para eliminar el dato
          setDb(newData); // se actualiza la variable de estado del objeto Db
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <FetchContext.Provider
      value={{
        db,
        error,
        login,
        createData,
        getData,
        deleteData,
        updateData,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}
