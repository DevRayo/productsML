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

export default function ProductList() {
  const { category = [], isLoadingCategory, isErrorCategory } = useCategory();
  const [selectedOption, setSelectedOption] = useState("All");
  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(selectedOption);
  }, [selectedOption]);

  const fetchProducts = async (option: any) => {
    let newProducts;
    if (option === "All") {
      newProducts = await useProduct();
    } else {
      newProducts = await useCategorySelected(option);
    }
    setProducts(newProducts);
  };

  const handleCategoryChange = async (event: any) => {
    setSelectedOption(event.target.value);
    let newProducts;
    if (event.target.value === "All") {
      newProducts = await useProduct();
    } else {
      newProducts = await useCategorySelected(event.target.value);
    }
    setProducts(newProducts);
  };

  return (
    <main>
      <Navbar></Navbar>
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
          <Product key={e.id} information={e}></Product>
        ))}
      </div>
    </main>
  );
}
