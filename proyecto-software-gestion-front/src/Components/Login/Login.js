import React, { useState ,useEffect } from 'react';
import "../Login/style/Login.css"
import { sendData, sendDataRegistro} from "../../services/Funciones_login"
import { useNavigate } from 'react-router-dom';
function Login() {

  const bodyClass = 'login-background'; 

  // Función para agregar la clase al body cuando el componente se monte
  useEffect(() => {
    document.body.classList.add(bodyClass);

    // Función para eliminar la clase del body cuando el componente se desmonte
    return () => {
      document.body.classList.remove(bodyClass);
    };
  }, []);

  const navigate = useNavigate();
/*
  const handleSideBarClick = () =>{
    navigate("/inicio")
  };
*/
  const [isRegister, setIsRegister] = useState(false);

  const togglePanel = () => {
    setIsRegister(!isRegister);
  };

   //---spring--
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [firstname, setFirstname] = useState("");
   const [emailre, setEmailre] = useState("");
   const [passwordre, setPasswordre] = useState("");

   const handleSubmit = () => {
    sendData(email, password, navigate);
  };
  const handleSubmitRegistro = () => {
   sendDataRegistro(firstname, emailre, passwordre);
  };

  return (
    <div className={`container ${isRegister ? 'right-panel-active' : ''}`}>
      <div className="form-container register-container">
        <form action="#">
          <h1>Regístrate.</h1>
          <input type="text" placeholder="Nombre"  value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
          <input type="email" placeholder="E-mail"  value={emailre}  onChange={(e) => setEmailre(e.target.value)}/>
          <input type="password" placeholder="Contraseña"  value={passwordre} onChange={(e) => setPasswordre(e.target.value)}/>
          <button onClick={handleSubmitRegistro}> Registrar</button>
        </form>
      </div>

      <div className="form-container login-container">
        <form action="#">
          <h1>Bienvenid@!</h1>
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <div className="content">  
            <div className="checkbox">
              <input type="checkbox" name="checkbox" id="checkbox" />
              <label>Recordar</label>
            </div>
            <div className="pass-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <button onClick={handleSubmit}>Ingresar</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="title">Hola <br /> amig@!</h1>
            <p>Si ya tienes una cuenta, inicia sesión aquí y diviértete.</p>
            <button className="ghost" onClick={togglePanel} id="login">
              Ingresar
              <i className="lni lni-arrow-left login"></i>
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="title">Inicia tu recorrido <br /> ahora !</h1>
            <p>Si aún no tienes una cuenta, únete a nosotros y comienza tu trayecto universitario.</p>
            <button className="ghost" onClick={togglePanel} id="register">
              Regístrate
              <i className="lni lni-arrow-right register"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
