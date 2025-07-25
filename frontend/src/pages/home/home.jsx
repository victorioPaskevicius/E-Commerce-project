import react from "react";
import { productsGrid } from "../../components/productsGrid.jsx";

function Home() {
  // const { data } = useFetch("http://localhost:3001/products");

  return (
    <>
      <div>
        <h1>Welcome to the Home Page</h1>
        <p className="m-5">
          This is where you can find the latest updates and features.
        </p>

        <hr />

        {/* Render grid products */}
        {productsGrid()}
      </div>
    </>
  );
}

export default Home;
