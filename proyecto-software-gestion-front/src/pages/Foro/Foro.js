import {  formatDistanceToNow } from 'date-fns'; 
import { es } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import { likes, corazoncitos, asombros, enviarPublicacion, getAllData, agregarComentario} from "../../services/Funciones_foro"

const ForoParticipacion = () => {


    const [contenido, setContenido] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [foros, setForos] = useState([]); 
    const [categoriaForo, setCategoriaForo] = useState('Todos');
    const [categoriasDisponibles] = useState(['Todos', 'Entretenimiento', 'Educación', 'Tecnología', 'Deportes', 'Eventos']);
    const [comentario, setComentario] = useState({});
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const nuevosForos = await getAllData();
                setForos(nuevosForos || []);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData(); 
    }, []);
    
    const handleCategoriaChange = (e) => {
        setCategoriaForo(e.target.value);
    };

    const handle = async () => {
        try {
            await enviarPublicacion(categoriaForo, contenido, archivo);
            setContenido('');
            setArchivo(null);
            const nuevosForos = await getAllData();
            setForos(nuevosForos || []);
        } catch (error) {
            console.error('Error al procesar la publicación:', error);
        }
    };

    const handleLike = async (foro_id) => {
        try {
            const result = await likes(foro_id);
            console.log('Resultado de likes:', result);
            const updatedForos = foros.map(foro => {
                if (foro.id === foro_id) {
                    return {
                        ...foro,
                        likes: foro.likes + 1 
                    };
                }
                return foro;
            });
            setForos(updatedForos);
        } catch (error) {
            console.error('Error en handleLike:', error);
        }
    };
    
    const handleCora = async (foro_id) => {
        try {
            const result = await corazoncitos(foro_id);
            console.log('Resultado de corazoncitos:', result);
            const updatedForos = foros.map(foro => {
                if (foro.id === foro_id) {
                    return {
                        ...foro,
                        corazoncitos: foro.corazoncitos + 1
                    };
                }
                return foro;
            });
    
            setForos(updatedForos);
        } catch (error) {
            console.error('Error en handleCora:', error);
        }
    };
    
    const handleAsom = async (foro_id) => {
        try {
            const result = await asombros(foro_id);
            console.log('Resultado de asombros:', result);
            const updatedForos = foros.map(foro => {
                if (foro.id === foro_id) {
                    return {
                        ...foro,    
                        asombros: foro.asombros + 1
                    };
                }
                return foro;
            });
    
            setForos(updatedForos);
        } catch (error) {
            console.error('Error en handleAsom:', error);
        }
    };
   

    const toggleRespuesta = (publicacionIndex) => {
        setComentario('');
        const updatedPublicaciones = [...foros];
        updatedPublicaciones[publicacionIndex].expandirRespuesta = !updatedPublicaciones[publicacionIndex].expandirRespuesta;
        setForos(updatedPublicaciones);
    };
  
    const handleAgregarComentario = async( comentario, idForo) => {
        try {
            const result = await agregarComentario(comentario, idForo);
            console.log('Resultado de agregar comentario:', result);
            const nuevosForos = foros.map(foro => {
                if (foro.id === idForo) {
                    return {
                        ...foro,
                        comentariosList: [...foro.comentariosList, comentario ]// Agrega el nuevo comentario al array existente
                    };
                }
                return foro;
            });
    
            setComentario('');
            setForos(nuevosForos);
           
    
        } catch (error) {
            console.error('Error en handleAgregarComentario:', error);
        }
       
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: '90px',
            marginRight: '10px',
            padding: '20px',
            backgroundColor: '#4B0082', // Fondo morado
          }}>
            <h1 style={{
              width: '100%',
              background: '#3f0069', // Morado oscuro
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              boxSizing: 'border-box',
              marginBottom: '10px'
            }}>📚 Bienvenido a tu foro estudiantil 🎓</h1>
            <p style={{ color: 'white' }}>Comparte tus ideas, chismes, propuestas u opiniones de la vida universitaria</p>
            <div style={{ color: 'purple' }}>
                <select onChange={handleCategoriaChange}>
                    {categoriasDisponibles.map((categoria, index) => (
                        <option key={index} value={categoria}>{categoria}</option>
                    ))}
                </select>
            </div>
            <div style={{ width: '70%', marginTop: '20px' }}>
                <div className="publicacion-input" style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Escribe una nueva publicación"
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                    />
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setArchivo(e.target.files[0])}
                    />
                    <button onClick={handle}>Enviar</button>
                </div>
                {foros.map((foro, index) => (
                    <div className="card" key={foro.id} style={{ backgroundColor: 'white', marginBottom: '70px', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '10px', width: '80%', margin: '0 auto'  }}>
                        <h2 style={{ textAlign: 'right' }}>{foro.categoria}</h2>
                        <p style={{ textAlign: 'right' }}>{formatDistanceToNow(new Date(foro.fecha), { locale: es, addSuffix: true })}</p>
                        <p>{foro.contenido}</p>

                        {foro.files && foro.files.map((archivo, archivoIndex) => (
                            <div key={archivoIndex}>
                                <img src={`/api/archivo/bajar/${archivo}`} alt={archivo} style={{ maxWidth: '260px', maxHeight: '260px', marginBottom: '10px' }} />
                            </div>
                        ))}

                        <button onClick={() => handleLike(foro.id)}>👍</button>
                        <button onClick={() => handleCora(foro.id)}>❤️</button>
                        <button onClick={() => handleAsom(foro.id)}>😲</button>
                        <p>Reacciones: {foro.likes} 👍 {foro.corazoncitos} ❤️ {foro.asombros} 😲</p>
                        <h3> Comentarios:</h3>
                            {foro.comentariosList.slice(0, 3).map((comentario, comentarioIndex) => (
                                <div key={comentarioIndex}>
                                    <p >{comentario}</p>
                                </div>
                            ))}
                        <button onClick={() => toggleRespuesta(index)}> Responder</button>

                        {foro.expandirRespuesta && (
                            <div>
                                <input type="text" placeholder="tu comentario"   value={comentario} onChange={(e) => setComentario(e.target.value)} />
                                <button onClick={() => handleAgregarComentario( comentario, foro.id)}>Enviar respuesta</button>
                            </div>
                        )}
                    </div>
                ))}
                

            </div>
        </div>
    );
};

export default ForoParticipacion;
