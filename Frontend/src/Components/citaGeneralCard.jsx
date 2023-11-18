import { useCitasGeneral } from "./context/CitasGeneralContext.jsx";
import { Link } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function CitaGeneralCard({ citaGeneral }) {
  const { deleteCitaGeneral } = useCitasGeneral();

  return (
    <div className="divCard">
      <header>
        <h4>Tema: {citaGeneral.tema}</h4>
      </header>
      <p>Tutor: {citaGeneral.tutor}</p>
      <p>Descripción: {citaGeneral.descripcion}</p>
      {/* <p>{new Date(citaGeneral.date).toLocaleDateString()}</p> */}
      <p>Fecha: {days(citaGeneral.fecha).utc().format("DD/MM/YYYY")}</p>
      <p>Hora: {citaGeneral.hora}</p>
      <div className="divBotonCard">
        <button
          className="botonCard"
          onClick={() => {
            //   console.log(citaGeneral._id);
            deleteCitaGeneral(citaGeneral._id);
          }}
        >
          Cancelar cita
        </button>
        {/* // aqui estamosredirigiendo hacia el formulario donde se originan las citaGeneral para queleugo a travez de la url con el id detecte si es una tarea nueva ouna edicion; */}
      </div>
    </div>
  );
}

export default CitaGeneralCard;
