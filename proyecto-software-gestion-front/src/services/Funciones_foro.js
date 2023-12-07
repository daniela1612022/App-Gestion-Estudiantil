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
    return null; // Puedes manejar el error de manera adecuada según tus necesidades
  }
};

export const enviarPublicacion = async (categoria, contenido, archivo) => {
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
      Swal.fire({
        icon: 'info',
        title: '¡Nueva Publicación!',
        showConfirmButton: false,
        timer: 750,
      });
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
      const response = await fetch('/api/foros/getall', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const foros = await response.json();
      return foros;

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
 
 export const likes = async (foro_id) => {
    const token = Cookies.get('token');
    try {
        const response = await fetch("/api/foros/likes", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: foro_id })
        });   

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error en la solicitud: ${errorMessage}`);
        }

        const data = await response.text();

        return data;
    } catch (error) {
        console.error('Error en likes:', error);
        Swal.fire({
            icon: 'error',
            title: '¡Algo ocurrió!',
            text: error.message,
            showConfirmButton: false
        });

        throw error;
    }
};



export const corazoncitos = async (foro_id) => {
    const token = Cookies.get('token');

    try {
        const response = await fetch("/api/foros/corazoncitos", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: foro_id })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error en la solicitud: ${errorMessage}`);
        }

        const data = await response.text(); 

        return data;
    } catch (error) {
        console.error('Error en corazoncitos:', error);
        Swal.fire({
            icon: 'error',
            title: '¡Algo ocurrió!',
            text: error.message, 
            showConfirmButton: false
        });

        throw error;
    }
};

export const asombros = async (foro_id) => {
    const token = Cookies.get('token');

    try {
        const response = await fetch("/api/foros/asombros", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: foro_id })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error en la solicitud: ${errorMessage}`);
        }

        const data = await response.text(); 

        return data;
    } catch (error) {
        console.error('Error en asombros:', error);
        Swal.fire({
            icon: 'error',
            title: '¡Algo ocurrió!',
            text: error.message, 
            showConfirmButton: false
        });

        throw error;
    }
};


export const agregarComentario = async (comentario, foro_id) => {
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

    const  contenido = comentario;
    const  idUsuario = tokenizado.id;
    const  idForo =  foro_id;

    try {
        const response = await fetch("/api/comentario/guardar", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'contenido': contenido,
                'idUsuario': idUsuario,
                'idForo': idForo
            })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error en la solicitud: ${errorMessage}`);
        }
        const data = await response.text();

        return data;
    } catch (error) {
        console.error('Error en agregarComentario:', error);
        Swal.fire({
            icon: 'error',
            title: '¡Algo ocurrió!',
            text: error.message,
            showConfirmButton: false
        });

        throw error;
    }
};