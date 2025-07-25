import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import ProductsByCategory from "./pages/productsByCategory/productsByCategory.jsx";
import NotFound from "./pages/notFound/notFound.jsx";
import ProductDetail from "./pages/productDetail/productDetail.jsx";
import Perfil from "./pages/perfil/perfil.jsx";
import Cart from "./pages/cart/cart.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/category/:id" element={<ProductsByCategory />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
