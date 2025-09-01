import { Header } from "../../components/header/header.jsx";
import { Footer } from "../../components/footer/footer.jsx";
import { ProductCart } from "../../components/productCart.jsx";

function Cart() {
  return (
    <>
      <Header />

      <ProductCart/>

      <Footer />
    </>
  );
}

export default Cart;
