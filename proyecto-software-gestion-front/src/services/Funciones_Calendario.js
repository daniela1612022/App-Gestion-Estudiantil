import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

Cookies.set('token', Cookies.get('token'), { sameSite: 'None', secure: true });

export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};


export const enviarEvento = async (categoria,contenido, archivo) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }
  
    const tokenizado = parseJwt(token);
  
    if (!tokenizado) {
      console.error('Error al parsear el token');
      return;
    }
  
    if (!contenido) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son necesarios',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    const idUsuario = tokenizado.id;
    const formData = new FormData();
    formData.append('categoria', categoria);
    formData.append('contenido', contenido);
    if (archivo) {
      formData.append('archivo', archivo);
    }
    formData.append('idUsuario', idUsuario);
  
    try {
      const response = await fetch('/api/foros/guardar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
    
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Proceso interrumpido!',
        showConfirmButton: false,
      });
    }
  };

  export const agregarevento = async (categoria, contenido, fecha) => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }
  
    const tokenizado = parseJwt(token);
  
    if (!tokenizado) {
      console.error('Error al parsear el token');
      return;
    }
  
    if (!categoria) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son necesarios',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    const nombreMes = meses[fecha.getMonth()]; // Obtener el nombre del mes
    const mensaje = `¡Nuevo evento!: ${contenido}\n el día ${fecha.getDate()} de ${nombreMes}`;
  
    const formData = new FormData();
    formData.append('categoria', categoria);
    formData.append('contenido', contenido); 
    formData.append('fecha', fecha);
  
    try {
      const response = await fetch('/api/calendario/guardar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Proceso interrumpido!',
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
        icon: 'info',
        title: '¡Nueva Publicación!',
        text: mensaje,
        showConfirmButton: false,
        timer: 750,
    });
    enviarEvento(categoria, mensaje);
  };

  export const getAllData = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }
  
    const tokenizado = parseJwt(token);
  
    if (!tokenizado) {
      console.error('Error al parsear el token');
      return;
    }
  
    try {
      const response = await fetch('/api/calendario/getall', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const calendario = await response.json();
      return calendario;

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error en la visualización',
        text: 'efesota',
        showConfirmButton: false
      });
    }
 };
 