import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { useCitasGeneral } from "../context/CitasGeneralContext.jsx";
import CitaGeneralCard from "../citaGeneralCard";
import ScrollUp from "../crud/ScrollUp.jsx";

function CitasGeneral() {
  //   const { user } = useAuth();
  const { getCitasGeneralUser, citasGeneral } = useCitasGeneral();
  console.log("estas son las citasGeneralUser:", citasGeneral);
  useEffect(() => {
    getCitasGeneralUser();
  }, []);

  if (citasGeneral.length === 0)
    return (
      <h5 className="backgTextDark">
        No tienes citas de tutoria en el momento. Puedes tomar una nueva en
        Acciones/Tomar tutoria.
      </h5>
    );

  return (
    <>
      <center>
        <h5 className="backgTextDark">Mis próximas tutorías:</h5>
      </center>
      <div>
        {citasGeneral.map((citaGeneral) => (
          <CitaGeneralCard citaGeneral={citaGeneral} key={citaGeneral._id} />
        ))}
      </div>
      <ScrollUp>Arriba</ScrollUp>
    </>
  );
}

export default CitasGeneral;
