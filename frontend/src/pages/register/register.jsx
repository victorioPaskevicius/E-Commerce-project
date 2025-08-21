import "./register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const { request, loading, error, data } = useFetch();

  const navigate = useNavigate();

  function inputsValidate() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.length < 6 || username.length > 20) {
      setErrorInput("El nombre debe tener entre 6 y 20 caracteres");
      return false;
    }

    if (!regex.test(email)) {
      setErrorInput("Correo electrónico no válido");
      return false;
    }

    if (password.length < 6 || password.length > 20) {
      setErrorInput("La contraseña debe tener entre 6 y 20 caracteres");
      return false;
    }

    if (password !== rePassword) {
      setErrorInput("Las contraseñas no coinciden");
      return false;
    }
    return true;
  }

  function resetForm() {
    setUsername("");
    setEmail("");
    setPassword("");
    setRePassword("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputsValidate()) {
      request(
        "http://localhost:3001/users",
        "POST",
        { username, email, password },
        "/user/"
      );
      resetForm();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="complete username">Username</label>
          <input
            className="container-fluid"
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="container-fluid"
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="container-fluid"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            className="container-fluid"
            placeholder="Password"
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <div className="container">
          <p className="">Ya tienes una cuenta? <a href="/login" className="text-success">Inicia sesion</a></p>
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          Register
        </button>
        <div className="error container-fluid text-danger">
          <b>{errorInput ? errorInput : ""}</b>
        </div>
      </form>
    </>
  );
}

export default Register;
