import React from "react";
import CrudTableRow from "./CrudTableRow";
import styles from "../styles/crutTable.module.css";

const CrudTable = ({
  data,
  setDataToEdit,
  setLoading,
  deleteData,
  handleEditClick,
}) => {
  return (
    <div>
      <h4 className="backgTextLight">Tabla de tareas</h4>
      <table role="table" id="tablaTareas">
        <thead role="rowgroup" className={styles.thead}>
          <tr className={styles.tr}>
            <th role="columnheader" className={styles.th}>
              Título
            </th>
            <th role="columnheader" className={styles.th}>
              Descripción
            </th>
            <th role="columnheader" className={styles.th}>
              Fecha
            </th>
            <th role="columnheader" className={styles.th}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" className={styles.tbody}>
          {data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el._id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
                handleEditClick={handleEditClick}
                setLoading={setLoading}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4">Sin tareas pendientes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
