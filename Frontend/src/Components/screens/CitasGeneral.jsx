import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { useCitasGeneral } from "../context/CitasGeneralContext.jsx";
import TomarCitaCard from "../TomarCitaCard.jsx";
import ScrollUp from "../crud/ScrollUp.jsx";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function CitasGeneral() {
  const { getCitasGeneral, citasGeneral } = useCitasGeneral();

  const [filtroMedico, setFiltroMedico] = useState("");
  const [filtroTutor, setFiltroTutor] = useState("");
  const [filtroDescripcion, setFiltroHora] = useState("");
  const [filtroHorario, setFiltroHorario] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [iniciado, setIniciado] = useState(0);
  const [citasFiltradas, setCitasFiltradas] = useState(citasGeneral);
  //   const [citasGeneral, setCitasGeneral] = useState([]);

  // Función para filtrar citas generales
  function filtrarCitasGenerales(citasGenerales) {
    return citasGenerales.filter((citaGeneral) => {
      const fechaFormateada = dayjs(citaGeneral.fecha)
        .utc()
        .format("DD/MM/YYYY");
      return (
        citaGeneral.tema.toLowerCase().includes(filtroMedico.toLowerCase()) &&
        citaGeneral.tutor.toLowerCase().includes(filtroTutor.toLowerCase()) &&
        citaGeneral.descripcion
          .toLowerCase()
          .includes(filtroDescripcion.toLowerCase()) &&
        citaGeneral.hora.toLowerCase().includes(filtroHorario.toLowerCase()) &&
        fechaFormateada.includes(filtroFecha)
      );
    });
  }

  //   const { user } = useAuth();
  console.log("estas son las citasGeneral:", citasGeneral);
  useEffect(() => {
    getCitasGeneral();
    // setCitasFiltradas(citasGeneral);
  }, []);

  useEffect(() => {
    const citasFiltradas = filtrarCitasGenerales(citasGeneral);
    setCitasFiltradas(citasFiltradas);
    setIniciado(iniciado + 1);
  }, [
    filtroMedico,
    filtroTutor,
    filtroDescripcion,
    filtroHorario,
    filtroFecha,
  ]);

  if (citasGeneral.length === 0)
    return (
      <h5 className="backgTextDark">No hay citas de tutoria en el momento.</h5>
    );

  return (
    <div>
      <center style={{ margin: "1rem 0" }}>
        <div className="search-input">
          <input
            type="search"
            placeholder="Filtrar por tema"
            value={filtroMedico}
            onChange={(e) => setFiltroMedico(e.target.value)}
          />
          <input
            type="search"
            placeholder="Filtrar por tutor"
            value={filtroTutor}
            onChange={(e) => setFiltroTutor(e.target.value)}
          />
          <input
            type="search"
            placeholder="Filtrar por Descripción"
            value={filtroDescripcion}
            onChange={(e) => setFiltroHora(e.target.value)}
          />
          <input
            type="search"
            placeholder="Filtrar por hora:  hh:mm"
            value={filtroHorario}
            onChange={(e) => setFiltroHorario(e.target.value)}
          />

          <input
            type="search"
            placeholder="Filtrar por Fecha: dd/mm/aaaa "
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </div>
      </center>
      <center style={{ margin: "5px 0" }}>
        <h5 className="backgTextDark">
          Todas las citas de tutoría disponibles:
        </h5>
      </center>
      <div>
        {iniciado > 1
          ? citasFiltradas.map((citaGeneral) => (
              <TomarCitaCard citaGeneral={citaGeneral} key={citaGeneral._id} />
            ))
          : citasGeneral.map((citaGeneral) => (
              <TomarCitaCard citaGeneral={citaGeneral} key={citaGeneral._id} />
            ))}
      </div>
      <ScrollUp>Arriba</ScrollUp>
    </div>
  );
}

export default CitasGeneral;
