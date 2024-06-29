import useSWR from "swr";
import { fetcher } from "./apiService";

export const useCategory = () => {
  const { data, error } = useSWR(
    `https://fakestoreapi.com/products/categories`,
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
    const response = await fetch(`https://fakestoreapi.com/products`);
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
      `https://fakestoreapi.com/products/category/${type}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener la información");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
