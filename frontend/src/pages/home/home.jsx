import { productsGrid } from "../../components/productsGrid.jsx";
import { Header } from "../../components/header/header.jsx";
import { Footer } from "../../components/footer/footer.jsx";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <h1>Welcome to the Home Page</h1>
        <p className="m-5">
          This is where you can find the latest updates and features.
        </p>

        <h2>Featured Products</h2>

        <hr />
        {productsGrid()}
      </div>
      <Footer />
    </>
  );
}

export default Home;
