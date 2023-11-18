// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Components/context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Index from "../src/Components/screens/Index.jsx";
import LoginForm from "./Components/screens/LoginForm.jsx";
import RegistroForm from "./Components/screens/RegistroForm";
import Servicios from "./Components/screens/Servicios";
import GenerarCitasGeneral from "./Components/screens/GenerarCitasGeneral.jsx";
import CuentaUsuario from "./Components/screens/CuentaUsuario";
import Inicio from "./Components/screens/inicio";
import ContactForm from "./Components/crud/ContactForm.jsx";
import CitasGeneral from "./Components/screens/CitasGeneral.jsx";
import CitasGeneralUser from "./Components/screens/CitasGeneralUser.jsx";
import CitasGeneralTutor from "./Components/screens/CitasGeneralTutor.jsx";
import CambiarContrasena from "./Components/screens/CambiarContrasena.jsx";
import CrudApi from "./Components/crud/CrudApi.jsx";

import { FetchTaskProvider } from "./Components/context/FetchContext.jsx";
import { CitaGeneralProvider } from "./Components/context/CitasGeneralContext.jsx";
import NavbarBootstrap from "./Components/NavbarBootstrap.jsx";
// import Navbarm from "./Components/Navbarm.jsx";

// el AuthProvider es el contexto.
const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <FetchTaskProvider>
          <CitaGeneralProvider>
            <Router>
              <main className="container">
                <NavbarBootstrap />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/registro" element={<RegistroForm />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/servicios" element={<Servicios />} />
                  <Route path="/contactForm" element={<ContactForm />} />
                  <Route element={<ProtectedRoute />}>
                    {/* <Route path="/agendaCitas" element={<AgendaCitas />} /> */}
                    <Route path="/citasGeneral" element={<CitasGeneral />} />
                    <Route path="/crudApi" element={<CrudApi />} />
                    <Route
                      path="/cambiarContrasena"
                      element={<CambiarContrasena />}
                    />
                    <Route
                      path="/citasGeneralUser"
                      element={<CitasGeneralUser />}
                    />
                    <Route
                      path="/citasGeneralTutor"
                      element={<CitasGeneralTutor />}
                    />
                    <Route
                      path="/citasGeneralTutor/:code"
                      element={<CitasGeneralTutor />}
                    />
                    <Route
                      path="/citasGeneral/:id"
                      element={<GenerarCitasGeneral />}
                    />
                    <Route
                      path="/generarCitasGeneral"
                      element={<GenerarCitasGeneral />}
                    />
                    <Route path="/cuentaUsuario" element={<CuentaUsuario />} />
                    <Route path="/inicio" element={<Inicio />} />
                  </Route>
                </Routes>
              </main>
            </Router>
          </CitaGeneralProvider>
        </FetchTaskProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
