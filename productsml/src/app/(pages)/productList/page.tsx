"use client";
import Navbar from "../../components/navbar";
import Product from "../../components/product";
import {
  useCategory,
  useCategorySelected,
  useProduct,
} from "@/app/services/products";
import styles from "../../styles/ProductList.module.scss";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import Loader from "@/app/components/loader";

export default function ProductList() {
  const { category = [] } = useCategory();
  const [selectedOption, setSelectedOption] = useState("All");
  const [product, setProducts] = useState([]);
  const { setProductSelected } = useAppContext();

  useEffect(() => {
    localProducts();
    fetchProducts(selectedOption);
    setProductSelected(null);
  }, [selectedOption]);

  const localProducts = async () => {
    const storedProduct = localStorage.getItem("productsLocalStorage");
    if (storedProduct) {
      setProducts(JSON.parse(storedProduct));
    }
  };

  const fetchProducts = async (option: any) => {
    let newProducts;
    if (option === "All") {
      newProducts = await useProduct();
    } else {
      newProducts = await useCategorySelected(option);
    }
    localStorage.setItem("productsLocalStorage", JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleCategoryChange = async (event: any) => {
    let newProducts;
    setSelectedOption(event.target.value);
    setTimeout(async () => {
      if (event.target.value === "All") {
        newProducts = await useProduct();
      } else {
        newProducts = await useCategorySelected(event.target.value);
      }
      setProducts(newProducts);
    });
  };

  return (
    <main>
      <Navbar typeSection="productList"></Navbar>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 pt-5 pl-12">
        <h1 className={`${styles.categoryTitle} mt-10`}>New products</h1>
        <div
          className={`${styles.categorySelection} flex justify-between float-end `}
        >
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Select category</span>
            </div>
            <select
              className="select select-bordered"
              value={selectedOption}
              onChange={handleCategoryChange}
            >
              <option disabled>Selecciona</option>
              <option>All</option>
              {category.map((e: any) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
        {product.map((e: any) => (
          <Product key={e.id} product={e}></Product>
        ))}
      </div>
      {product.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10">
          {Array.apply(0, Array(12)).map(function (_x, i) {
            return <Loader key={i}></Loader>;
          })}
        </div>
      ) : null}
    </main>
  );
}
