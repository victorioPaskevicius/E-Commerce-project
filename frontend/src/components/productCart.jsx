import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import React from "react";

export function ProductCart() {
  const { request, loading, error, data } = useFetch();
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
  const token = localStorage.getItem('token');
  const userId = parseJwt(token).id
  request("http://localhost:3001/cart", "POST", {userId});

  return (
    <>
      <div className="container text-center">
        <h2 className="fs-1">Tu carrito</h2>
        <hr />
        {/* container products */}
        <div className="container d-flex flex-column gap-5 bg-secondary py-5">
          {/* container single product */}
          <div className="d-flex px-5 py-3 justify-content-between align-items-center bg-dark shadow-lg rounded">
            <div className="d-flex align-items-center">
              <img src="null" alt="productImage" />
              <div className="d-flex flex-column">
                <p>{data[0].name}</p>
                <span>{data[0].price}</span>
              </div>
            </div>
            <div
              className="btn-group d-flex align-items-center gap-3 p-3 border"
              role="group"
              aria-label="Basic outlined example"
            >
              <button type="button" className="btn btn-outline-success">
                -
              </button>
              <span>0</span>
              <button type="button" className="btn btn-outline-success">
                +
              </button>
            </div>
            <span>Precio final</span>
          </div>
          <hr />
          {/* Resumen de compra */}
          <div className="container">
            <div className="d-flex justify-content-around align-items-center">
              <p className="fs-4">Subtotal</p>
              <span>Subtotal price</span>
            </div>
            <div className="d-flex justify-content-around align-items-center">
              <p className="fs-4">Envio</p>
              <span>Precio de envio</span>
            </div>
            <hr />
            <div className="d-flex justify-content-around align-items-center">
              <p className="fw-bold fs-4">Total</p>
              <div className="d-flex flex-column">
                <span>Total price</span>
                <button className="btn btn-success btn-lg">Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
