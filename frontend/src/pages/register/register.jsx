import "./register.css";
import React, { useState } from "react";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form action="" className="form">
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
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
            placeholder="Password"
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
          />
        </div>
        <button onClick={(e)=>{e.preventDefault(), console.log({username,email,password})}} type="submit" className="btn btn-success btn-lg">
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
