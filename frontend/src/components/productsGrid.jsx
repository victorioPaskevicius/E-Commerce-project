import { CardProduct } from "./cardProduct.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { useEffect } from "react";

export function ProductsGrid() {
  const { request, data, loading, error } = useFetch();
  useEffect(() => {
    request("http://localhost:3001/products", "GET");
  },[]);

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p>Error al cargar productos 😐</p>

  return (
    <div className="container d-grid gap-3">
      <div className="row">
        {data?.map((product) => (
          <div className="col-12 col-sm-6 col-md-4" key={product.id}>
            {CardProduct(product)}
          </div>
        ))}
      </div>
    </div>
  );
}
