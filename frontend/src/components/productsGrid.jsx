import { CardProduct } from "./cardProduct.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { useEffect } from "react";

export function ProductsGrid() {

  return (
    <div className="container d-grid gap-3">
      {<CardProduct/>}
    </div>
  );
}
