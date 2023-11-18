import { useForm } from "../../hooks/useForm.js";
import Loader from "./Loader";
import Message from "./Message";
import styles from "../styles/contactForm.module.css";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  comments: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexComments = /^.{1,255}$/;

  if (!form.name.trim()) {
    errors.name = "El campo 'Nombre' es requerido";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  }

  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto";
  }

  if (!form.subject.trim()) {
    errors.subject = "El campo 'Asunto a tratar' es requerido";
  }

  if (!form.comments.trim()) {
    errors.comments = "El campo 'Comentarios' es requerido";
  } else if (!regexComments.test(form.comments.trim())) {
    errors.comments =
      "El campo 'Comentarios' no debe exceder los 255 caracteres";
  }

  return errors;
};

let styleF = {
  fontWeight: "bold",
  color: "#dc3545",
};

const ContactForm = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  return (
    <>
      <div className={styles.formulario}>
        <h5 className="backgTextDark">
          Gracias por ver mi trabajo, envíame tus comentarios:
        </h5>
        <form onSubmit={handleSubmit}>
          <center>
            <input
              type="text"
              name="name"
              placeholder="Escribe tu nombre"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.name}
              required
            />
            {errors.name && <p style={styleF}>{errors.name}</p>}
            <input
              type="email"
              name="email"
              placeholder="Escribe tu email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.email}
              required
            />
            {errors.email && <p style={styleF}>{errors.email}</p>}
            <input
              type="text"
              name="subject"
              placeholder="Asunto a tratar"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.subject}
              required
            />
            {errors.subject && <p style={styleF}>{errors.subject}</p>}
            <textarea
              name="comments"
              cols="50"
              rows="5"
              placeholder="Escribe tus comentarios"
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.comments}
              className={styles.textArea}
              required
            ></textarea>
            {errors.comments && <p style={styleF}>{errors.comments}</p>}
            <input className="botonLargo" type="submit" value="Enviar" />
            <button
              className="botonLargo btn-block"
              type="button"
              // style={{ color: "black", backgroundColor: "rgb(13, 97, 97)" }}
              onClick={() => window.history.back()}
            >
              Volver
            </button>
          </center>
        </form>
        {loading && <Loader />}
        {response && (
          <Message msg="Los datos han sido enviados" bgColor="#198754" />
        )}
      </div>

      <a
        href="https://wa.me/573022264607?text=Hola%20me%20interesa%20tu%20trabajo!"
        className={styles.whatsapp}
        target="_blank"
        rel="noreferrer"
      ></a>
    </>
  );
};

export default ContactForm;
