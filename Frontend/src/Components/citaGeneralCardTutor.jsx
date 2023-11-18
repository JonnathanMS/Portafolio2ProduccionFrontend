import { useCitasGeneral } from "./context/CitasGeneralContext.jsx";
import days from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";
days.extend(utc);

function CitaGeneralCardTutor({ citaGeneral }) {
  const { deleteCitaGeneral } = useCitasGeneral();
  const navigate = useNavigate();

  return (
    <div className="divCard">
      <header>
        <h4>Tema: {citaGeneral.tema}</h4>
      </header>
      <p>Detalles: {citaGeneral.descripcion}</p>
      {/* <p>{new Date(citaGeneral.date).toLocaleDateString()}</p> */}
      <p>Fecha: {days(citaGeneral.fecha).utc().format("DD/MM/YYYY")}</p>
      <p>Hora: {citaGeneral.hora}</p>
      <div className="divBotonCard">
        <button
          className="botonCard"
          onClick={() => {
            //   console.log(citaGeneral._id);
            deleteCitaGeneral(citaGeneral._id);
            alert(
              "La cita de tutoria se ha cancelado. Puedes Generar una nueva en la opción Generar tutoria"
            );
            navigate("/generarCitasGeneral");
          }}
        >
          Cancelar cita
        </button>
        {/* // aqui estamosredirigiendo hacia el formulario donde se originan las citaGeneral para queleugo a travez de la url con el id detecte si es una tarea nueva ouna edicion; */}
      </div>
    </div>
  );
}

export default CitaGeneralCardTutor;
