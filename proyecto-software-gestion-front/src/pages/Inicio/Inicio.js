import React from 'react';
import { FaPoll, FaCalendarAlt, FaComments, FaChartBar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import imagen1 from '../../assets/1.png'
import imagen2 from '../../assets/2.png'
import imagen3 from '../../assets/3.png'
import imagen4 from '../../assets/4.png'

const Inicio = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      color: '#4B0082',
      background: '#4B0082',
      minHeight: '100vh',
    }}>
      <header style={{ marginBottom: '40px', textAlign: 'center', color: 'white' }}>
        <h1>¡Explora y Participa en la Experiencia Universitaria Mejorada!</h1>
        <p>Descubre una nueva forma de interactuar y aprender con estas herramientas:</p>
      </header>

      <div style={sectionStyle}>
        <Link to="/votaciones" style={linkStyle}>
          <div style={cardContent}>
            <div style={iconContainerStyle}>
              <FaPoll size={50} color="#4B0082" />
            </div>
            <div style={textContainerStyle}>
              <h2>Votaciones y Encuestas</h2>
              <p>Expresa tu opinión y participa en encuestas para influir en decisiones importantes.</p>
            </div>
            <div style={imageContainerStyle}>
              <img src={imagen1} alt="Votaciones y Encuestas"  style={imgStyle}/>
            </div>
            <div style={{ clear: 'both' }}></div>
          </div>
        </Link>
      </div>

      <div style={sectionStyle}>
  <Link to="/calendario" style={linkStyle}>
    <div style={cardContent}>
      <div style={iconContainerStyle}>
        <FaCalendarAlt size={50} color="#4B0082" />
      </div>
      <div style={textContainerStyle}>
        <h2>Calendario de Eventos</h2>
        <p>No te pierdas ningún evento universitario importante, mantente al tanto con nuestro calendario.</p>
      </div>
      <div style={imageContainerStyle}>
        <img src={imagen2} alt="Calendario de Eventos"  style={imgStyle}/>
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  </Link>
</div>

<div style={sectionStyle}>
  <Link to="/foro" style={linkStyle}>
    <div style={cardContent}>
      <div style={iconContainerStyle}>
        <FaComments size={50} color="#4B0082" />
      </div>
      <div style={textContainerStyle}>
        <h2>Foro Estudiantil</h2>
        <p>Conéctate, comparte conocimientos y resuelve dudas en nuestra comunidad estudiantil.</p>
      </div>
      <div style={imageContainerStyle}>
        <img src={imagen3} alt="Foro Estudiantil"  style={imgStyle} />
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  </Link>
</div>

<div style={sectionStyle}>
  <Link to="/estadisticas" style={linkStyle}>
    <div style={cardContent}>
      <div style={iconContainerStyle}>
        <FaChartBar size={50} color="#4B0082" />
      </div>
      <div style={textContainerStyle}>
        <h2>Estadísticas y Análisis</h2>
        <p>Visualiza datos y estadísticas para un mejor entendimiento de la comunidad estudiantil.</p>
      </div>
      <div style={imageContainerStyle}>
        <img src={imagen4} alt="Estadísticas y Análisis"  style={imgStyle} />
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  </Link>
</div>
      
    </div>
  );
};

// Estilos para las tarjetas y contenido
const sectionStyle = {
  width: '80%',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.5)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  background: 'white',
};

const cardContent = {
  overflow: 'hidden',
};

const iconContainerStyle = {
  float: 'left',
  width: '10%',
  textAlign: 'center',
};

const textContainerStyle = {
  float: 'left',
  width: '60%',
};

const imageContainerStyle = {
  float: 'left',
  width: '30%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const imgStyle = {
  maxWidth: '50%', // Ajusta el tamaño máximo de la imagen
  maxHeight: '50%', // Ajusta el tamaño máximo de la imagen
  display: 'block',
  margin: 'auto', // Centra horizontalmente la imagen
};

// Estilos para el enlace
const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

export default Inicio;
