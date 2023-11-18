// import { useCitasGeneral } from "./context/CitasGeneralContext.jsx";
import { useCitasGeneral } from "./context/CitasGeneralContext";
import { Link, useNavigate } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAuth } from "./context/AuthContext.jsx";

days.extend(utc);

function TomarCitaCard({ citaGeneral }) {
  const navigate = useNavigate(); // Obtiene la instancia de history para la redirección
  const { updateCitaGeneral } = useCitasGeneral();
  const { user } = useAuth();
  const esMismo = citaGeneral.code == user.id;
  return (
    <div className="divCard">
      <header>
        <h5>Tema: {citaGeneral.tema}</h5>
      </header>
      <p>Tutor: {citaGeneral.tutor}</p>
      <p>Descripción:{citaGeneral.descripcion}</p>
      {/* <p>{new Date(citaGeneral.date).toLocaleDateString()}</p> */}
      <p>Fecha:{days(citaGeneral.fecha).utc().format("DD/MM/YYYY")}</p>
      <p>Hora: {citaGeneral.hora}</p>
      <div className="divBotonCard">
        <button
          className="botonCard"
          onClick={() => {
            updateCitaGeneral(citaGeneral._id, citaGeneral);
            navigate("/citasGeneralUser");
          }}
          disabled={esMismo}
        >
          {esMismo ? "Esta cita es contigo!" : "Tomar cita"}
        </button>
        {/* // aqui estamosredirigiendo hacia el formulario donde se originan las citaGeneral para queleugo a travez de la url con el id detecte si es una tarea nueva ouna edicion; */}
      </div>
    </div>
  );
}

export default TomarCitaCard;
