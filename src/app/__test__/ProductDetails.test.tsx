import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useAppContext } from "@/context";
import { getProduct, postLocalProducts } from "@/app/services/products";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/app/types/product";
import ProductDetails from "../(pages)/productDetails/[id]/page";

jest.mock("../../context", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../services/products", () => ({
  getProduct: jest.fn(),
  postLocalProducts: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe("ProductDetails Component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      setProductSelected: jest.fn(),
    });

    (useParams as jest.Mock).mockReturnValue({
      id: "1",
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    jest.clearAllMocks();
  });

  it("renders product details correctly", async () => {
    const mockProduct: Product = {
      id: 1,
      title: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Test Category",
      image: "/test-image.png",
      rating: { rate: 4.5, count: 10 },
    };

    (getProduct as jest.Mock).mockResolvedValue(mockProduct);
    render(<ProductDetails />);
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(
        screen.getByText("Description: Test Description")
      ).toBeInTheDocument();
      expect(screen.getByText("Category: Test Category")).toBeInTheDocument();
      expect(screen.getByText("Price: 100")).toBeInTheDocument();
      expect(screen.getByText("Rating count:10")).toBeInTheDocument();
      expect(screen.getByText("Rating rate:4.5")).toBeInTheDocument();
    });
  });

  it("calls fetchProducts and sets product correctly", async () => {
    const mockProduct: Product = {
      id: 1,
      title: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Test Category",
      image: "/test-image.png",
      rating: { rate: 4.5, count: 10 },
    };
    const setProductSelectedMock = jest.fn();
    (useAppContext as jest.Mock).mockReturnValue({
      setProductSelected: setProductSelectedMock,
    });
    (getProduct as jest.Mock).mockResolvedValue(mockProduct);
    render(<ProductDetails />);
    await waitFor(() => {
      expect(getProduct).toHaveBeenCalledWith("1");
      expect(setProductSelectedMock).toHaveBeenCalledWith(mockProduct);
      expect(postLocalProducts).toHaveBeenCalledWith(mockProduct);
    });
  });
});
