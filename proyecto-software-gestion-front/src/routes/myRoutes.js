import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Components/Login/Login';
import Sidebar from '../Components/Sidebar/Sidebar';
import Inicio from '../pages/Inicio/Inicio';
import Votaciones from '../pages/Votaciones/Votaciones';
import Estadisticas from '../pages/Estadisticas/Estadisticas';
import RecursosEstudiantiles from '../pages/Herramientas/Herramientas';
import Calendario from '../pages/Calendario/Calendario';
import Foro from '../pages/Foro/Foro';
import Footer from '../Components/Footer/Footer';

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <div style={styles.container}>
              <Sidebar />
              <div style={styles.content}>
                <Routes>
                  <Route path="/inicio" element={<Inicio />} />
                  <Route path="/votaciones" element={<Votaciones />} />
                  <Route path="/estadisticas" element={<Estadisticas />} />
                  <Route path="/calendario" element={<Calendario />} />
                  <Route path="/foro" element={<Foro />} />
                  <Route path="/herramientas" element={<RecursosEstudiantiles />} />
                </Routes>
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(75, 0, 130)',
    justifyContent: 'space-between',
    minHeight: '100vh',
    paddingBottom: '70px', // Ajusta el espacio inferior
  },
  content: {
    flex: 1,
    width: '100%',
    padding: '20px',
    paddingBottom: '20px', // Espacio adicional en la parte inferior del contenido
  },
};
