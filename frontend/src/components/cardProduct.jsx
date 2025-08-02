export function cardProduct(product) {
  return (
    <div className="border p-3 m-3" key={product.id}>
      <h2>Product: {product.name}</h2>
      <p>{product.description}</p>
      <h3>Price: {product.price}</h3>
      <h3>Category: {product.category_id}</h3>
      <br />
      <div className="d-flex flex-column gap-2">
        <button className="btn btn-success">Add to Cart</button>
        <button className="btn btn-secondary">View Details</button>
      </div>
    </div>
  );
}
