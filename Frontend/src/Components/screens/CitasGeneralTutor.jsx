import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { useCitasGeneral } from "../context/CitasGeneralContext.jsx";
import CitaGeneralCardTutor from "../citaGeneralCardTutor.jsx";
import styles from "../styles/citasTutor.module.css";
import { useAuth } from "../context/AuthContext.jsx";
import ScrollUp from "../crud/ScrollUp.jsx";
function CitasGeneralTutor() {
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(true);
  const { user } = useAuth();
  const { getCitasGeneralTutor, citasGeneralTutor } = useCitasGeneral();
  console.log("estas son las citasGeneral Tutor:", citasGeneralTutor);
  useEffect(() => {
    getCitasGeneralTutor(user.id);
  }, []);

  const handleOnchange1 = () => {
    setIsChecked1(!isChecked1);
  };
  const handleOnchange2 = () => {
    setIsChecked2(!isChecked2);
  };

  if (citasGeneralTutor.length === 0)
    return (
      <h5 className="backgTextDark">
        No tienes citas de tutoria en el momento. Genera citas en la opcion
        'Generar tutoria' de la barra de navegacion
      </h5>
    );

  const citasTomadas = citasGeneralTutor.filter((citaTutor) => {
    return citaTutor.user != null;
  });
  const citasSinTomar = citasGeneralTutor.filter((citaTutor) => {
    return citaTutor.user == null;
  });

  //   console.log("citasTomadas", citasTomadas);
  //   console.log("citasSinTomar", citasSinTomar);
  return (
    <>
      <div className="backgTextDark">
        <center>
          <h5>Próximas clases como tutor:</h5>
        </center>
        <div className={styles.divCheckbox}>
          <label htmlFor="cbox1" className={styles.labelT}>
            <input
              type="checkbox"
              id="cbox1"
              checked={isChecked1}
              className={styles.checkboxT}
              onChange={handleOnchange1}
            />
            Ver citas tomadas.
          </label>

          <label htmlFor="cbox2" className={styles.labelT}>
            <input
              type="checkbox"
              id="cbox2"
              checked={isChecked2}
              className={styles.checkboxT}
              onChange={handleOnchange2}
            />
            Ver citas sin tomar.
          </label>
        </div>
      </div>

      <section>
        <div>
          {isChecked1 &&
            (citasTomadas.length > 0 ? (
              <>
                <hr style={{ border: "5px solid black" }} />
                <div className="sl">
                  {citasTomadas.map((citaGeneral) => (
                    <>
                      <div
                        style={{
                          color: "var(--background-color-dark)",
                          margin: "1rem 0",
                          border: "5px solid black",
                          borderRadius: "1rem",
                        }}
                      >
                        <div className="backgTextDark">
                          <p> Tomada por: {citaGeneral.user.username}</p>
                          <p> Email:{citaGeneral.user.email}</p>
                        </div>
                        <CitaGeneralCardTutor
                          citaGeneral={citaGeneral}
                          key={citaGeneral._id}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <hr style={{ border: "5px solid black" }} />
                <h5 className="backgTextDark">
                  Por el momento no han tomado tus citas. Revisa frecuentemente
                  para no faltar a tus aprendices.
                </h5>
              </>
            ))}
        </div>
        <div>
          {isChecked2 && (
            <>
              <hr style={{ border: "5px solid black" }} />
              <center>
                <h5 className="backgTextDark">Citas sin ser tomadas aún:</h5>
              </center>
            </>
          )}
          {isChecked2 &&
            (citasSinTomar.length > 0 ? (
              <div className="sl">
                {citasSinTomar.map((citaGeneral) => (
                  <>
                    <CitaGeneralCardTutor
                      citaGeneral={citaGeneral}
                      key={citaGeneral._id}
                    />
                  </>
                ))}{" "}
              </div>
            ) : (
              <>
                <hr style={{ border: "5px solid black" }} />
                <h5 className="backgTextDark">
                  No tienes citas sin tomar! Genera nuevas citas de tutoria en
                  la opción de la barra de navegacion Generar Tutoria.
                </h5>
              </>
            ))}
        </div>
      </section>
      <ScrollUp>Arriba</ScrollUp>
    </>
  );
}

export default CitasGeneralTutor;
