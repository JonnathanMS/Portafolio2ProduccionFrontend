import { createContext, useContext, useState } from "react";
import {
  createCitaGeneralRequest,
  getCitasGeneralRequest,
  getCitasGeneralTutorRequest,
  getCitasGeneralUserRequest,
  getCitaGeneralRequest,
  deleteCitasGeneralRequest,
  updateCitasGeneralRequest,
} from "../../api/citasGeneral.js";

const CitaGeneralContext = createContext();

export const useCitasGeneral = () => {
  const context = useContext(CitaGeneralContext);
  if (!context) {
    throw new Error(
      "useCitasGeneral debe ser usado con un citasGeneral provider"
    );
  }
  return context;
};

export function CitaGeneralProvider({ children }) {
  const [citasGeneral, setCitasGeneral] = useState([]);
  const [citasGeneralTutor, setCitasGeneralTutor] = useState([]);

  const getCitasGeneral = async () => {
    try {
      const res = await getCitasGeneralRequest();
      setCitasGeneral(res.data); // aqui estamos poniendo en la variable de estado cita, las cita que estan en la bd mongo.
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getCitasGeneralTutor = async (code) => {
    try {
      const res = await getCitasGeneralTutorRequest(code);
      //   console.log(res);
      setCitasGeneralTutor(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCitasGeneralUser = async () => {
    try {
      const res = await getCitasGeneralUserRequest();
      setCitasGeneral(res.data); // aqui estamos poniendo en la variable de estado cita, las cita que estan en la bd mongo.
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const createCitaGeneral = async (cita) => {
    // console.log("cita! del CitasGeneral Context");
    const res = await createCitaGeneralRequest(cita);
    console.log(res);
  };

  const deleteCitaGeneral = async (id) => {
    try {
      const res = await deleteCitasGeneralRequest(id);
      // console.log(res.data);
      console.log(res);
      if (res.status === 204)
        setCitasGeneral(citasGeneral.filter((cita) => cita._id !== id)); // si la respuesta anterior es 204 entonces establece en el arreglo de tareas el mismo arreglo filtrando la tarea eliminada.
    } catch (error) {
      console.log(error);
    }
  };

  const getCitaGeneral = async (id) => {
    try {
      const res = await getCitaGeneralRequest(id);
      //   console.log(res);
      return res.data; // retornamos los datos de la tarea.
    } catch (error) {
      console.error(error);
    }
  };

  const updateCitaGeneral = async (id, cita) => {
    // recibe el id de la tarea a editar y los valores nuevos en cita
    try {
      await updateCitasGeneralRequest(id, cita);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CitaGeneralContext.Provider
      value={{
        citasGeneral,
        citasGeneralTutor,
        createCitaGeneral,
        getCitasGeneral,
        getCitaGeneral,
        deleteCitaGeneral,
        updateCitaGeneral,
        getCitasGeneralUser,
        getCitasGeneralTutor,
      }}
    >
      {children}
    </CitaGeneralContext.Provider>
  );
}
