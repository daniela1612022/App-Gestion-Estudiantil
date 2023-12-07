import Swal from 'sweetalert2';
import Cookies from 'js-cookie';


export const sendData = (email, password, navigate) => {

  const data = {
    email: email,
    password: password
  };
  
  fetch('/api/auth/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      Cookies.set('token', data.token);
      Swal.fire({
        icon: 'success',
        title: 'Bienvenid@',
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/inicio");
      window.location.reload();
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Revisa tus datos',
        confirmButtonText: 'Aceptar',
        timer: 700,

      });
    });
};

export const sendDataRegistro = (firstname, email, password) => {
  if (!firstname || !email || !password) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos son necesarios',
      confirmButtonText: 'Aceptar',
    });
    return;
  }
  if (!email.includes('@')) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La dirección de correo electrónico debe contener "@"',
      confirmButtonText: 'Aceptar',
    });
    return;
  }

  const data = {
    firstname: firstname,
    email: email,
    password: password,
  };

  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      Cookies.set('token', data.token);
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        showConfirmButton: false,
        timer: 700,
      });
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error en el registro',
        confirmButtonText: 'Aceptar',
      });
    });
};

