import React from "react";
import { render, screen } from "@testing-library/react";
import { useAppContext } from "@/context";
import { useCategory, useProduct } from "@/app/services/products";
import ProductList from "../(pages)/productList/page";

jest.mock("../../context", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../services/products", () => ({
  useCategory: jest.fn(),
  useCategorySelected: jest.fn(),
  useProduct: jest.fn(),
}));


describe("ProductList Component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      setProductSelected: jest.fn(),
    });
    (useCategory as jest.Mock).mockReturnValue({
      category: ["Category 1", "Category 2"],
    });
    jest.clearAllMocks();
  });
  it("renders product list", async () => {
    (useProduct as jest.Mock).mockResolvedValue([
      {
        id: 1,
        title: "Product 1",
        category: "Category 1",
        description: "Description 1",
        price: 100,
        image: "/image1.png",
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        title: "Product 2",
        category: "Category 2",
        description: "Description 2",
        price: 200,
        image: "/image2.png",
        rating: { rate: 4.0, count: 20 },
      },
    ]);
    render(<ProductList />);
    expect(screen.getByText("Select category")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
