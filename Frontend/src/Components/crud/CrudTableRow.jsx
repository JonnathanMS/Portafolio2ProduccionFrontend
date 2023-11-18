import React from "react";
import styles from "../styles/crutTableRow.module.css";
const CrudTableRow = ({
  el,
  setDataToEdit,
  deleteData,
  handleEditClick,
  setLoading,
}) => {
  const { _id, title, description, date } = el;

  const handleClick = () => {
    // Colocamos el foco en el input al hacer clic en el botón de editar
    setDataToEdit(el);
    handleEditClick();
  };
  return (
    <tr role="row" className={styles.trTareas}>
      <td role="cell">{title}</td>
      <td role="cell">{description}</td>
      <td className={styles.adjustWeigth} role="cell">
        {date.split("T").shift().split("-").reverse().join("/")}
      </td>
      <td className={styles.inputBoton} role="cell">
        <div className={styles.divButon}>
          <button
            className="btn btn-outline-light"
            // onClick={() => setDataToEdit(el)}
            onClick={handleClick}
          >
            Editar
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => {
              deleteData(_id);
              setLoading(true);
            }}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CrudTableRow;
