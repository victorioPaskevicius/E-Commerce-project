import react from "react";
import { useFetch } from "../../useFetch.js";
import { cardProduct } from "../../components/cardProduct.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const { data } = useFetch("http://localhost:3001/products");

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p className="m-5">
        This is where you can find the latest updates and features.
      </p>
      <div className="d-grid">
        {data?.map((product) => cardProduct(product))}
      </div>
    </div>
  );
}

export default Home;
