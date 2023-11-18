import React, { useState, useEffect } from "react";
import styles from "../styles/crudForm.module.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const initailForm = {
  title: "",
  description: "",
  date: "",
  _id: null,
};

// aqui estamos destructurando en las propiedades
const CrudForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  titleInputRef,
}) => {
  const [form, setForm] = useState(initailForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initailForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // este hace referencia al atributo name.del input que genero el evento.. no a un valor que se pueda llamar name.
    });
    // console.log("Este es el form", form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      // aqui se esta cambiando directamente la variable de estado, no el formulario, por eso no se usa el .value
      alert("Datos incompletos");
      return; // asi detenemos el resto de la ejecucion si los datos estan incompletos
    }

    if (form._id === null) {
      // si el id es null es porque queremos generar la informacion, si ya tenia id es para actulizarla.
      //   console.log("este es el data", form);
      delete form._id;
      const dataValid = {
        ...form,
        date: form.date ? dayjs.utc(form.date).format() : dayjs.utc().format(),
      };
      createData(dataValid);
    } else {
      updateData(form);
    }

    handleReset(); // luego se limpia el formulario
  };

  const handleReset = (e) => {
    setForm(initailForm);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3 className={`backgTextLight ${styles.titleShort}`}>
        {dataToEdit ? "Editar tarea" : "Agregar tarea"}
      </h3>
      <form onSubmit={handleSubmit} className={styles.crudForm}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          id="title"
          onChange={handleChange}
          value={form.title}
          ref={titleInputRef}
        />
        <input
          type="text"
          name="description"
          placeholder="Descripcion"
          onChange={handleChange}
          value={form.description}
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={dayjs(form.date.split("/").reverse().join("-"))
            .utc()
            .format("YYYY-MM-DD")}
        />
        <nav className="nav_botonera" style={{ display: "flex" }}>
          <input
            className="btn btn-outline-primary btn_botonera"
            type="submit"
            value="Enviar"
          />
          <input
            className="btn btn-outline-primary btn_botonera"
            type="reset"
            value="Limpiar"
            onClick={handleReset}
          />
        </nav>
      </form>

      <button
        className="botonLargo"
        type="button"
        // style={{ color: "black", backgroundColor: "rgb(13, 97, 97)" }}
        onClick={() => window.history.back()}
      >
        Volver
      </button>
    </div>
  );
};

export default CrudForm;
