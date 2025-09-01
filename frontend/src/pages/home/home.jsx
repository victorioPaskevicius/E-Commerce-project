import { ProductsGrid } from "../../components/productsGrid.jsx";
import { Header } from "../../components/header/header.jsx";
import { Footer } from "../../components/footer/footer.jsx";

function Home() {
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
  let token = localStorage.getItem("token");
  let tokenId = parseJwt(token).id;

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
        {ProductsGrid()}
      </div>
      <Footer />
    </>
  );
}

export default Home;
