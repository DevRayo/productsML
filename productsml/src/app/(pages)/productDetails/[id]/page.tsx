"use client";
import Navbar from "@/app/components/navbar";
import { getProduct } from "@/app/services/products";
import { Product } from "@/app/types/product";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context";

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { productSelected, setProductSelected } = useAppContext();
  const router = useParams();
  const routerNavigation = useRouter();

  useEffect(() => {
    if (router.id) {
      fetchProducts(router.id.toString());
    }
  }, []);

  const handlerlistProduct = () => {
    routerNavigation.push(`/productList`);
  };

  const fetchProducts = async (option: string) => {
    try {
      const data: Product = await getProduct(option);
      setProduct(data);
      setProductSelected(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <>
      <Navbar typeSection="productDetails"></Navbar>
      {product ? (
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={product.image}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">{product?.title}</h1>
              <p className="py-6">Description: {product.description}</p>
              <p className="pt-2">Category: {product.category}</p>
              <p className="pt-2">Price: {product.price}</p>
              <p className="pt-2">Rating count:{product.rating.count}</p>
              <p className="pt-2">Rating rate:{product.rating.rate}</p>
              <button
                className="btn btn-primary mt-10"
                onClick={handlerlistProduct}
              >
                Ver más productos
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
