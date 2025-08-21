import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Index from "./pages/index/index.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import ProductsByCategory from "./pages/productsByCategory/productsByCategory.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import ProductDetail from "./pages/productDetail/productDetail.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Cart from "./pages/cart/cart.jsx";

function App() {
  const navigate = useNavigate();

  function parseJwt(token) {
    if (!token) return null; // 👈 evitar error si no existe
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);

    if (!decoded || decoded.exp * 1000 < Date.now()) {
      // Token inválido o expirado
      navigate("/login");
    } else {
      // Token válido → redirigir al perfil/usuario
      navigate("/user/" + localStorage.getItem("id"));
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/user/:userid" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products/:category" element={<ProductsByCategory />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
