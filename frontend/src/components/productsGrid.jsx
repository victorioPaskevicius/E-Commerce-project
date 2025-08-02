import { cardProduct } from "./cardProduct.jsx";
import { useFetch } from "../hooks/useFetch.js";

export function productsGrid() {
  const { data } = useFetch("http://localhost:3001/products");

  return (
    <div className="container d-grid gap-3">
      <div className="row">
        {data?.map((product) => (
          <div className="col-12 col-sm-6 col-md-4" key={product.id}>
            {cardProduct(product)}
          </div>
        ))}
      </div>
    </div>
  );
}
