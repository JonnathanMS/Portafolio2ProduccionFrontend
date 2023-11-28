// import React from "react";
import { useForm } from "react-hook-form"; // esta libreria ejecuta el formulario de forma facil
import { useCitasGeneral } from "../context/CitasGeneralContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAuth } from "../context/AuthContext.jsx";
import ScrollUp from "../crud/ScrollUp.jsx";

dayjs.extend(utc);

function GenerarCitasGeneral() {
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useAuth();
  const { createCitaGeneral, getCitaGeneral, updateCitaGeneral } =
    useCitasGeneral();
  const navigate = useNavigate();
  const params = useParams(); // trae los parémetros de la url
  var confirma = true;
  //   console.log("tarea del Form Exportada del contexto:", citasGeneral);
  //   console.log("CreateCitaGeneral del Form Exportado del contexto:", createCitaGeneral());

  useEffect(() => {
    async function loadCitaGeneral() {
      // esta funcion se usa para poder hacer el llamado asyncrono en el useEffect.
      if (params.id) {
        // si la url tiene el parámetro id...
        const citaGeneral = await getCitaGeneral(params.id); // obtiene la citaGeneral a travez del parametro id que trae la url.
        console.log(citaGeneral);
        setValue("tema", citaGeneral.tema); // aqui establecemos el valor que venia en el elemento tema de la tarea a editar y lo penemos en el form
        setValue("tutor", citaGeneral.tutor); // aqui establecemos el valor que venia en el elemento tutor de la tarea a editar y lo penemos en el form
        setValue("descripcion", citaGeneral.descripcion); // aqui establecemos el valor que venia en el elemento descripcion  de la tarea a editar y lo penemos en el form
        setValue("fecha", dayjs.utc(citaGeneral.fecha).format("YYYY-MM-DD")); // aqui establecemos el valor que venia en el elemento fecha  de la tarea a editar y lo penemos en el form
        setValue("hora", citaGeneral.hora); // aqui establecemos el valor que venia en el elemento fecha  de la tarea a editar y lo penemos en el form
      }
    }
    loadCitaGeneral();
  }, []);

  //*En este on submit verificamos si hay un parametro, para asi saber si va a editar el elemento o la va a generar.
  //*SUBMIT colocando fecha vacia como la actual,..y dataValid
  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      fecha: data.fecha ? dayjs.utc(data.fecha).format() : dayjs.utc().format(),
    };
    if (params.id) {
      // si existe un id en el parametro de la url entonces estamos editando.
      //   updateCitaGeneral(params.id, data);

      if (!data.tema || !data.descripcion || !data.hora)
        return alert("No puede haber campos vacios.");
      if (!data.fecha)
        confirma = confirm(
          "Aceptar:Se establecerá la fecha actual como fecha de la tarea. Cancelar:puede cambiarla en la opcion Fecha."
        );
      if (confirma || data.fecha) updateCitaGeneral(params.id, dataValid); // estamos actualizando la tarea en la base de datos de mongo
    } else {
      // console.log(data);
      //   createCitaGeneral(data); // estamos creando la tarea en la base de datos de mongo
      if (!data.tema || !data.descripcion || !data.hora)
        return alert(
          "No puede haber campos vacios, y debe escoger una fecha y hora."
        );
      if (!data.fecha)
        confirma = confirm(
          "Aceptar:Se establecerá la fecha actual como fecha de la tarea. Cancelar:puede cambiarla en la opcion Fecha."
        );
      if (confirma || data.fecha) createCitaGeneral(dataValid); // estamos creando la tarea en la base de datos de mongo
    }
    if (data.fecha || confirma) navigate("/citasGeneral"); //   navigate("/citasGeneral"); // lineas antes de el if-else
  });

  return (
    <>
      <center>
        <h5 className="backgTextLight">Generar nueva cita de tutoria:</h5>
        <div className="div1Generar">
          <form onSubmit={onSubmit}>
            <label htmlFor="tema">Tema a tratar:</label>
            <input
              type="text"
              {...register("tema")}
              autoFocus
              placeholder="Tema:"
            />
            <label htmlFor="tutor">Tutor: (username)</label>
            <input type="text" {...register("tutor")} value={user.username} />

            <label htmlFor="descripcion">
              Descripción: métodos, links e info.
            </label>
            <textarea
              className="textareaGenerar"
              cols="3"
              rows="3"
              placeholder="Descripción: Aquí puedes poner links, información, el tema que vas explicar, el costo, entre otros"
              {...register("descripcion")}
            ></textarea>
            <label htmlFor="fecha">Fecha de la tutoría:</label>
            <input type="date" {...register("fecha")} />
            <label htmlFor="hora">Hora:</label>
            <input type="time" {...register("hora")} />
            <button className="guardarGenerar">Guardar</button>
          </form>
        </div>
      </center>
      <ScrollUp></ScrollUp>
    </>
  );
}

export default GenerarCitasGeneral;
