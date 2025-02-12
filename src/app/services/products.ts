import useSWR from "swr";
import { fetcher } from "./apiService";
import { Product } from "../types/product";

export const useCategory = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products/categories`,
    fetcher
  );
  return {
    category: data,
    isLoadingCategory: !error && !data,
    isErrorCategory: error,
  };
};

export const useProduct = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (!response.ok) {
      throw new Error("Error al obtener la información");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const useCategorySelected = async (type: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/category/${type}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener la información");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (product: Product) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Error al obtener la información");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (type: string, product: Product) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${type}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Error al obtener la información");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (product: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${product}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener la información");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const postLocalProducts = async (data: Product) => {
  localStorage.setItem("productsSelectedLocalStorage", JSON.stringify(data));
};

export const getLocalProducts = async () => {
  return localStorage.getItem("productsSelectedLocalStorage");
};
