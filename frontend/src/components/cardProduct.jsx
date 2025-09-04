import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function CardProduct() {
  const { request, data, loading, error } = useFetch();
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
  const token = localStorage.getItem("token");
  const userId = parseJwt(token).id;

  useEffect(() => {
    request("http://localhost:3001/products", "GET");
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  async function addProduct(product) {
    try {
      const res = await fetch("http://localhost:3001/addProdCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          product_id: product.id,
          price: product.price,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(res.message || "No se puedo añadir el producto");
      }

      alert(result.message);
    } catch (error) {
      console.error(error);
    }
  }

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
