import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./utils/protectedRoute.jsx";

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
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
