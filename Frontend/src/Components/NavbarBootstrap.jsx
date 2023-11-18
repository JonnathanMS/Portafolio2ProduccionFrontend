// https://react-bootstrap.github.io/docs/components/navbar#home

// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./styles/navbar.module.css";
import { useAuth } from "./context/AuthContext";

function NavScrollExample() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <Navbar expand="lg" className={`bg-body-black ${styles.navbar}`}>
      <Container fluid>
        <Navbar.Brand
          href={isAuthenticated ? "/cuentaUsuario" : "/registro"}
          className={`text-white ${styles.navBrand}`}
        >
          {isAuthenticated ? (
            <h1 className={`${styles.navh1}`}>Bienvenido {user.username}</h1>
          ) : (
            <div className={`bienvenido ${styles.bienvenido}`}>
              <div className={`botonReg ${styles.botonReg}`}>Registrarse</div>
              <p className={styles.bienvenidoP}>Bienvenido!</p>
            </div>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className={styles.togle} />
        <Navbar.Collapse id="navbarScroll" className={styles.navCollapse}>
          <Nav
            className={`me-auto my-2 my-lg-0 ${styles.toEnd}`}
            style={{ maxHeight: "300px" }}
            navbarScroll
          >
            {
              <Nav.Link href="/servicios" className={styles.navLink}>
                Videos
              </Nav.Link>
            }

            {isAuthenticated ? (
              <>
                <NavDropdown
                  title="Acciones"
                  id="navbarScrollingDropdown"
                  color="black"
                  className={styles.navLink}
                >
                  <NavDropdown.Item href="/generarCitasGeneral">
                    Generar tutoria
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/citasGeneral">
                    Tomar tutoria
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/citasGeneralUser">
                    Mis tutorias
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/citasGeneralTutor">
                    Mis aprendices
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/crudApi">
                    Mis tareas
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/cuentaUsuario">
                    Mi cuenta
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/cambiarContrasena">
                    Actualizar datos
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/inicio" className={styles.navLink}>
                  Inicio
                </Nav.Link>
                <Nav.Link href="/contactForm" className={styles.navLink}>
                  Contáctame
                </Nav.Link>
                <Nav.Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                  className={styles.navLink}
                >
                  Cerrar sesion
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/contactForm" className={styles.navLink}>
                  Contáctame
                </Nav.Link>
                <Nav.Link href="/" className={styles.navLink}>
                  Index
                </Nav.Link>
                <Nav.Link href="/login" className={styles.navLink}>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavScrollExample;
