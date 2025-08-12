import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const {request, loading, error, data } = useFetch()

  const navigate = useNavigate();

  function inputsValidate() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      setErrorInput("Correo electronico no valido");
      return false;
    } else if (password.length < 6 || password.length > 20) {
      setErrorInput("La contraseña debe tener entre 6 y 20 caracteres");
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (inputsValidate()) {
      request(
        "http://localhost:3001/userLogin",
        "POST",
        { email, password },
        "/user/"
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} action="" className="form">
        <h1 className="form_title">Login</h1>
        <div className="form_group">
          <label htmlFor="email" className="form_label">
            Email
          </label>
          <input
            value={email}
            type="email"
            id="email"
            className="form_input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form_group">
          <label htmlFor="password" className="form_label">
            Password
          </label>
          <input
            value={password}
            type="password"
            id="password"
            className="form_input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="container">
          <p className="">Aun no tienes una cuenta? <a href="/register" className="text-success">Registrate</a></p>
        </div>        
        <button type="submit" className="btn btn-success btn-lg">
          Login
        </button>
        <div className="error container-fluid text-danger">
          <b>{errorInput ? errorInput : ""}</b>
        </div>
      </form>
    </>
  );
}

export default Login;
