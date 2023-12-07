import React from 'react';
import { FaBook, FaPoll, FaImages, FaTrello } from 'react-icons/fa';

const RecursosEstudiantiles = () => {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.card}>
          <FaBook style={styles.icon} />
          <h2>Repositorios</h2>
          <p>Repositorios, Libros, Talleres y ayudas</p>
          <a href="https://repository.usergioarboleda.edu.co/" style={styles.link}>Explorar</a>
        </div>
        <div style={styles.card}>
          <FaPoll style={styles.icon} />
          <h2> Encuestas</h2>
          <p>Crea encuestas con Google Forms</p>
          <a href="https://www.google.com/forms" target="_blank" style={styles.link} rel="noopener noreferrer">Crear Encuesta</a>
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.card}>
          <FaTrello style={styles.icon} />
          <h2>Organiza tus Tareas</h2>
          <p>Utiliza Trello y organiza tu tiempo y tus deberes!</p>
          <a href="https://id.atlassian.com/logout?continue=https%3A%2F%2Ftrello.com%2Flogout%3Fdsc%3Dc78e1d6cc8902d9f0642ff7d367ebd94df5d89568b85bae32896fe49c759f76a" style={styles.link}>Usar Trello</a>
        </div>
        <div style={styles.card}>
          <FaImages style={styles.icon} />
          <h2>Redes de la Universidad</h2>
          <p>Fotos y eventos en la universidad</p>
          <a href="https://www.instagram.com/usergioarboleda/?hl=es" style={styles.link}>Ver Galería</a>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centrar los elementos
    backgroundColor: '#3f0069', // Fondo
    padding: '20px', // Espaciado interno
    borderRadius: '10px', // Bordes redondeados
    color: '#fff', // Color de texto
    margin: '0 auto', // Centrar automáticamente
    width: '80%', // Ancho del contenedor
    maxWidth: '1200px', // Ancho máximo del contenedor
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0',
    width: '100%', // Ancho al 100%
  },
  card: {
    width: '45%',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#3f0069', // Color de texto para las tarjetas
  },
  icon: {
    fontSize: '48px',
    color: '#3f0069',
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: 'blue', // Cambio a color azul para los enlaces
    fontSize: '16px',
    display: 'block',
    marginTop: '10px',
  },
};

export default RecursosEstudiantiles;
