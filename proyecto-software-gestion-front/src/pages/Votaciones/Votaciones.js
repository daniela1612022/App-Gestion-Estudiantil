import React, { useState, useEffect } from 'react';
import '../Votaciones/Style/Votaciones.css'
import {postular, getAllData, votar, calificar} from "../../services/Funciones_votaciones"

const Votaciones = () => {
  //aqui empecé a hacer cambios
  const [mostrarCampos, setMostrarCampos] = useState(false);
  const [first, setFirst] = useState('');
  const [description, setDescription] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [representantes, setRepresentantes] = useState([]); 
  const [categoriaRepre, setCategoriaRepre] = useState('Derecho');
  const [categoriasDisponibles] = useState(['Derecho', 'Ingeniería', 'Medicina', 'Psicología', 'Historia', 'Economía','Arquitectura','Artes']);
  const [showPropuestas, setShowPropuestas] = useState(false);
  const [currentPropuesta, setCurrentPropuesta] = useState({ propuestas: [], descripcion: '' });;
  const [notaRepre, setNotaRepre] = useState('4');
  const [notasDisponibles] = useState(['1', '2', '3', '4', '5']);
  const [showSugerencias, setShowSugerencias] = useState(false);
  const [currentSugerencia, setCurrentSugerencia] = useState('');
  const usuario = {
    rol: 'ADMIN'
  };


  const handleCategoriaChange = (e) => {
    setCategoriaRepre(e.target.value);
  };

  const handleNotaChange = (e) => {
    setNotaRepre(e.target.value);
  };

  const handlePostularClick = () => {
    setMostrarCampos(true);
  };

  const handleenviarpostulado = async () => {
    try {
        await postular(categoriaRepre, first,  description, archivo);
        setFirst('');
        setDescription('');
        setArchivo(null);
        const nuevosrepre = await getAllData();
        console.log(nuevosrepre);
        setRepresentantes(nuevosrepre || []);
    } catch (error) {
        console.error('Error al procesar la publicación:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
          const nuevosrepre = await getAllData();
          setRepresentantes(nuevosrepre || []);
          console.log(representantes);

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
    fetchData(); 
  }, []);

  const handlePropuestas = (propuestas) => {
    setCurrentPropuesta(propuestas);
    setShowPropuestas(true);
  };

  const handleVotar = async (repre_id) => {
   try {
        await votar(repre_id);
    } catch (error) {
    }
  };

  const handleSugerencias = (sugerencias) => {
    setCurrentSugerencia(sugerencias);
    setShowSugerencias(true);
  };

  const handleEnviarNota = async (repre_id, notaRepre) =>{
    if (repre_id!== null) {
      await calificar(repre_id, notaRepre);
    }
   setShowSugerencias(false);
  };


  const categoriasUnicas = [...new Set(representantes.map(representante => representante.categoria))];

  return (

    <div className="votaciones-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto', marginLeft: '100px' }}>
    {/* Despliegue del boton postular solo para ADMIN */}
    {usuario.role === 'ADMIN' && (
      <button className="button" style={{ width: '80%', marginBottom: '5px' }} onClick={handlePostularClick}></button>
    )}
      {mostrarCampos && (
        <div>
          <div style={{ color: 'purple' }}>
            <select onChange={handleCategoriaChange}>
              {categoriasDisponibles.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
          <div style={{ width: '70%', marginTop: '20px' }}>
            <div className="publicacion-input" style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Nombre del estudiante a postular"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
              <input
                type="text"
                placeholder="Propuesta general"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input type="file" multiple onChange={(e) => setArchivo(e.target.files[0])} />
              <button onClick={handleenviarpostulado}>Enviar</button>
            </div>
          </div>
        </div>
      )}
      {/* ------- fin de postulados*/}

      {categoriasUnicas.map(categoria => (
        <div key={categoria} style={{ width: '100%', marginBottom: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', background: '#3f0069', color: 'white', padding: '15px', borderRadius: '8px' }}>{`Representantes de ${categoria}`}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {representantes
              .filter(representante => representante.categoria === categoria)
              .map(representante => (
                <div
                  key={representante.id}
                  style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '30%', marginBottom: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', background: '#fff', textAlign: 'center' }}>
                  {representante.files && representante.files.map((archivo, archivoIndex) => (
                    <div key={archivoIndex}>
                        <img src={`/api/archivo/bajar/${archivo}`} alt={archivo} style={{ width: '100%', borderRadius: '10px 10px 0 0' }}/>
                    </div>
                  ))}
                  <h3 style={{ textAlign: 'center' }}>{representante.firstname}</h3>
                  <button onClick={() => handleVotar(representante.id)} style={{ width: '80%', marginBottom: '5px' }}>Votar</button>
                  <button onClick={() => handlePropuestas(representante.description)} style={{ width: '80%', marginBottom: '5px' }}>Propuesta</button>
                  <button onClick={() => handleSugerencias(representante.id)} style={{ width: '80%' }}>Calificar</button>
                </div>               
              ))}

            {showPropuestas && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                  <h3>Propuestas</h3>
                  <ul>
                    {currentPropuesta}
                  </ul>
                  <button onClick={() => setShowPropuestas(false)}>Cerrar</button>
                </div>
            )}

            {showSugerencias && (
              <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
              <h3>Califica: Siendo 1 el valor mas bajo y 5 el valor mas alto</h3>
              <div style={{ color: 'purple' }}>
                <select onChange={handleNotaChange}>
                  {notasDisponibles.map((nota, index) => (
                    <option key={index} value={nota}>
                      {nota}
                    </option>
                  ))}
                </select>
            </div>
              <button onClick={() =>handleEnviarNota(currentSugerencia, notaRepre)}>Enviar</button>
              <button onClick={() => setShowSugerencias(false)}>Cerrar</button>
            </div>
            )}
          </div>
        </div>
      ))}

    </div>
  
  );
};
export default Votaciones;