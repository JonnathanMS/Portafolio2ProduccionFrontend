//!: jonnathan.monroy741@gmail.com

//  importamos las librerias y componentes necesarios
import React, { useEffect, useState, useRef } from "react";
import CrudForm from "./CrudForm.jsx";
import CrudTable from "./CrudTable.jsx";
import Loader from "../crud/Loader";
import Message from "../crud/Message.jsx";
import { useFetchTasks } from "../context/FetchContext.jsx";
import ScrollUp from "./ScrollUp.jsx";
import styles from "../styles/crudForm.module.css";

// generamos el componente llamado crudApi
const CrudApi = () => {
  const { db, error, createData, getData, deleteData, updateData } =
    useFetchTasks();
  const titleInputRef = useRef(null);
  // nuestras variables de estado:
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    // Colocar el foco en el input al hacer clic en el botón de editar
    titleInputRef.current.focus();
  };

  // TRAEMOS LOS DATOS DEL API USANDO FETCH Y EL METODO GET:
  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
    setLoading(false);
  }, [loading]);

  //  RENDERIZDO DE LOS COMPONENTES DEL FORM Y LOS COMPONENTES DE LA TABLA
  return (
    <div>
      <center>
        <h6
          className={` ${styles.titleShort}`}
          style={{ margin: "1rem 0 0 0" }}
        >
          Mis tareas:
        </h6>
        <article>
          <CrudForm
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            titleInputRef={titleInputRef}
          />
          {loading && <Loader />}
          {error && (
            <Message
              msg={`Error ${error.status}: ${error.statusText}`}
              bgColor="#dc3545"
            />
          )}
          {db && (
            <>
              <CrudTable
                data={db}
                setLoading={setLoading}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
                handleEditClick={handleEditClick}
              />
            </>
          )}
          <ScrollUp></ScrollUp>
        </article>
      </center>
    </div>
  );
};

export default CrudApi;
