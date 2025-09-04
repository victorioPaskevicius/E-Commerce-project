import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export function ProductCart() {
  const { request, loading, error, data } = useFetch();
  const [cartItems, setCartItems] = useState([]);

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
  const userId = parseJwt(token)?.id;

  useEffect(() => {
    request("http://localhost:3001/getCart", "POST", { userId });
  }, []);

  // cuando llegan los datos, les agregamos una propiedad quantity
  useEffect(() => {
    if (data) {
      setCartItems(data.map((p) => ({ ...p, quantity: 1 })));
    }
  }, [data]);

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 500;
  const total = subtotal + shipping;

  return (
    <div className="container text-center">
      <h2 className="fs-1">Tu carrito</h2>
      <hr />

      <div className="container d-flex flex-column gap-5 bg-secondary py-5">
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="d-flex px-5 py-3 justify-content-between align-items-center bg-dark shadow-lg rounded"
          >
            <div className="d-flex align-items-center">
              <img src={product.image} alt="productImage" width={80} />
              <div className="d-flex flex-column ms-3">
                <p>{product.name}</p>
                <span>${product.price}</span>
              </div>
            </div>

            {/* Controles de cantidad */}
            <div className="btn-group d-flex align-items-center gap-3 p-3 border">
              <button
                onClick={() => updateQuantity(product.id, -1)}
                type="button"
                className="btn btn-outline-success"
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, +1)}
                type="button"
                className="btn btn-outline-success"
              >
                +
              </button>
            </div>

            {/* Precio total por producto */}
            <span>${product.price * product.quantity}</span>
          </div>
        ))}

        <hr />
        {/* Resumen de compra */}
        <div className="container">
          <div className="d-flex justify-content-around align-items-center">
            <p className="fs-4">Subtotal</p>
            <span>${subtotal}</span>
          </div>
          <div className="d-flex justify-content-around align-items-center">
            <p className="fs-4">Envío</p>
            <span>${shipping}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-around align-items-center">
            <p className="fw-bold fs-4">Total</p>
            <div className="d-flex flex-column">
              <span>${total}</span>
              <button className="btn btn-success btn-lg">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
