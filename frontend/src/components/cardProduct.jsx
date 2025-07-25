// import "bootstrap/dist/css/bootstrap.min.css";

export function cardProduct(product) {
  return (
    <div className="border p-3 m-3" key={product.id}>
      <h2>Name: {product.name}</h2>
      <p>{product.description}</p>
      <h3>Price: {product.price}</h3>
      <h3>Category: {product.category_id}</h3>
    </div>
  );
}
