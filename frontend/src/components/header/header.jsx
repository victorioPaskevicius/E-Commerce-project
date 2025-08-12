import "./header.css";

export function Header() {
  return (
    <header id="header" className="container-fluid">
      <div className="logo">
        <img src="../assets/logo-ecommerce.jpg" alt="logo" />
      </div>
      <nav className="nav_links">
        <ul>
          <li>
            <a className="btn btn-outline-success" href="/user/:id">Home</a>
          </li>
          <li>
            <a className="btn btn-outline-success" href="/login">Login</a>
          </li>
          <li>
            <a className="btn btn-outline-success" href="/register">Register</a>
          </li>
          <li>
            <a className="btn btn-outline-success" href="/perfil">Perfil</a>
          </li>
          <li>
            <a className="btn btn-outline-success" href="/cart">Cart</a>
          </li>
        </ul>
      </nav>
      <div className="search_bar">
        <input type="text" placeholder="Search products..." />
        <button className="btn btn-success" type="submit">🔍</button>
      </div>
    </header>
  );
}
