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


export const postular = async (categoria, firstname, description, archivo) => {
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
  
    if (!categoria || !firstname || !description || !archivo) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son necesarios',
        confirmButtonText: 'Aceptar',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('categoria',categoria);
    formData.append('firstname', firstname);
    formData.append('description', description);
    if (archivo) {
      formData.append('archivo', archivo);
    }
    console.log(formData);
    try {
      const response = await fetch('/api/representantes/guardar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: '¡Postulación exitosa!',
            showConfirmButton: false,
            timer: 750
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
      const response = await fetch('/api/representantes/getall', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const repre = await response.json();
      return repre;

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


 export const votar = async (repre_id) => {
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
        const response = await fetch(`/api/representantes/voto?id=${tokenizado.id}&repre=${repre_id}`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        });   

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error en la solicitud: ${errorMessage}`);
        }
        else{
            Swal.fire({
                icon: 'success',
                title: '¡Voto Realizado!',
                showConfirmButton: false,
                timer: 750
            });
        }

        const data = await response.text();

        return data;
    } catch (error) {
        Swal.fire({
            icon: 'info',
            title: '¡Ya tienes un voto registrado!',
            text: error.message,
            showConfirmButton: false
        });

        throw error;
    }
};

export const calificar = async (repre_id, nota) => {
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
        const response = await fetch(`/api/representantes/calificar?repre=${repre_id}&nota=${nota}`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        });   

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error en la solicitud: ${errorMessage}`);
        }
        else{
            Swal.fire({
                icon: 'success',
                title: '¡Calificación enviada!',
                showConfirmButton: false,
                timer: 750
            });
        }

        const data = await response.text();

        return data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'error en el proceso',
            text: error.message,
            showConfirmButton: false
        });

        throw error;
    }
};
