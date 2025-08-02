import "./login.css";

function Login() {
  return (
    <>
      <form action="" className="form">
        <h1 className="form_title">Login</h1>
        <div className="form_group">
          <label htmlFor="username" className="form_label">
            Username
          </label>
          <input type="text" id="username" className="form_input" required />
        </div>
        <div className="form_group">
          <label htmlFor="password" className="form_label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form_input"
            required
          />
        </div>
        <button type="submit" className="form_button">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
