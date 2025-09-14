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
    if (userId) {
      request("http://localhost:3001/getCart", "POST", { userId });
    }
  }, [userId]);

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

  // Funcion para eliminar un producto
  async function deleteProduct(product) {
    const res = await fetch("http://localhost:3001/productCart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: product.id,
        user_id: userId,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.message || "Error al eliminar producto");
      return;
    }

    // 💡 borrar también en el front para que no quede desactualizado
    setCartItems((prev) => prev.filter((p) => p.id !== product.id));
  }

  // Funcion para realizar el pedido
  async function order() {
    try {
      const res = await fetch("http://localhost:3001/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          items: cartItems.map((product) => ({
            product_id: product.id,
            quantity: product.quantity,
            price: product.price,
          })),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        // 🚨 res.message no existe, debe ser result.message
        alert(result.message || "Error al realizar el pedido");
        return;
      }

      alert(result.message || "Pedido realizado con éxito ✅");

      // 🧹 Limpiar carrito al confirmar el pedido
      setCartItems([]);
    } catch (err) {
      console.error("Error en order:", err);
      alert("Error de conexión con el servidor ❌");
    }
  }

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

            {/* boton eliminar */}
            <button
              onClick={() => {
                deleteProduct(product);
              }}
              className="btn btn-outline-danger"
            >
              Eliminar
            </button>

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
              <button onClick={order} className="btn btn-success btn-lg">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
