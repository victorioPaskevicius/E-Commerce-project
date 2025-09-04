import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function CardProduct() {
  const { request, data, loading, error } = useFetch();
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    request("http://localhost:3001/products", "GET");
    getCartId();
  }, []);

  function parseJwt(token) {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  async function getCartId() {
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    if (!decoded) return;

    try {
      const res = await fetch("http://localhost:3001/getCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: decoded.id }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      // suponiendo que tu backend devuelve un array con un objeto que tiene cart_id
      setCartId(result[0].cart_id);
    } catch (err) {
      console.error("Error obteniendo carrito:", err.message);
    }
  }

  async function addProduct(product) {
    if (!cartId) {
      alert("Carrito no encontrado");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/addProdCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: cartId,
          product_id: product.id,
          quantity: 1, // 👈 podés hacerlo dinámico si agregás un contador
          price: product.price,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      alert(result.message);
    } catch (err) {
      console.error("Error agregando producto:", err.message);
    }
  }

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div className="row">
      {data?.map((product) => (
        <div key={product.id} className="border p-3 col-6">
          <h2>Product: {product.name}</h2>
          <p>{product.description}</p>
          <h3>Price: {product.price}</h3>
          <h3>Category: {product.category_id}</h3>
          <br />
          <div className="d-flex flex-column gap-2">
            <button
              onClick={() => addProduct(product)}
              className="btn btn-success"
            >
              Add to Cart
            </button>
            <button className="btn btn-secondary">View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}
