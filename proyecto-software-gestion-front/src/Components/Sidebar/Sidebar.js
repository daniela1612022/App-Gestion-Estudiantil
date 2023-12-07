import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import "../Sidebar/style/Sidebar.css"

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const bodyClass = 'sidebar-background';

    // Función para agregar la clase al body cuando el componente se monte
    useEffect(() => {
      document.body.classList.add(bodyClass);
  
      // Función para eliminar la clase del body cuando el componente se desmonte
      return () => {
        document.body.classList.remove(bodyClass);
      };
    }, []);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
      <div className="logo_content">
        <div className="logo">
          <i className='bx bxs-heart'></i>
          <div className="logo_name">Bienvenid@s!</div>
        </div>
        <i className='bx bx-menu' id='btn' onClick={toggleSidebar}></i>
      </div>

      <div className="src">
        <i className='bx bx-search' onClick={toggleSidebar}></i>
        <input type="text" placeholder="Search.." />
      </div>

      <ul className="nav">
        <li>
          <Link to = "/inicio">
            <i className='bx bx-bar-chart-square'></i>
            <span className="link_name">Inicio</span>
          </Link>
          <span className="tooltip">inicio</span>
        </li>
        <li>
          <Link to="/foro">
            <i className='bx bx-line-chart'></i>
            <span className="link_name">Foro</span>
          </Link>
          <span className="tooltip">Foro</span>
        </li>
        <li>
          <Link to="/calendario">
            <i className='bx bx-calendar-event'></i>
            <span className="link_name">Calendario</span>
          </Link>
          <span className="tooltip">Calendario</span>
        </li>
        <li>
          <Link to="/votaciones">
            <i className='bx bxs-bolt'></i>
            <span className="link_name">Votaciones</span>
          </Link>
          <span className="tooltip">Votaciones</span>
        </li>
        <li>
          <Link to="/herramientas">
            <i className='bx bxs-heart-circle'></i>
            <span className="link_name">Herramientas</span>
          </Link>
          <span className="tooltip">Encuestas</span>
        </li>
        <li>
          <Link to="/estadisticas">
            <i className='bx bxs-pie-chart-alt'></i>
            <span className="link_name">Estadisticas</span>
          </Link>
          <span className="tooltip">Estadisticas</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
