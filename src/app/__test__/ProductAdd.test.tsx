import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAppContext } from "@/context";
import { useCategory, addProduct, updateProduct } from "../services/products";
import Swal from "sweetalert2";
import ProductsAdd from "../(pages)/productAdd/page";

jest.mock("../../context", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../services/products", () => ({
  useCategory: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

describe("ProductsAdd Component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      productSelected: null,
    });

    (useCategory as jest.Mock).mockReturnValue({
      category: ["Category 1", "Category 2"],
    });
    jest.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<ProductsAdd onData={jest.fn()} />);
    expect(screen.getByLabelText("Product name")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Product image")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("validates form fields", async () => {
    render(<ProductsAdd onData={jest.fn()} />);
    fireEvent.submit(
      screen.getByRole("button", { name: /create new product/i })
    );
    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    const onDataMock = jest.fn();
    const addProductMock = require("../services/products").addProduct;
    render(<ProductsAdd onData={onDataMock} />);
    fireEvent.change(screen.getByLabelText("Product name"), {
      target: { value: "New Product" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Category 1" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Product image"), {
      target: { value: "image.jpg" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Description 1" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: /create new product/i })
    );
    await waitFor(() => {
      expect(addProductMock).toHaveBeenCalledWith({
        title: "New Product",
        category: "Category 1",
        price: "10",
        image: "image.jpg",
        description: "Description 1",
      });
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Success!",
        text: "Product saved",
        icon: "success",
        confirmButtonText: "OK",
      });
      expect(onDataMock).toHaveBeenCalledWith(false);
    });
  });

  it("calls updateProduct when editing a product", async () => {
    const onDataMock = jest.fn();
    const updateProductMock = require("../services/products").updateProduct;
    (useAppContext as jest.Mock).mockReturnValue({
      productSelected: {
        id: 1,
        title: "Existing Product",
        category: "Category 1",
        price: "20",
        image: "image.jpg",
        description: "Description 1",
      },
    });
    render(<ProductsAdd onData={onDataMock} />);
    fireEvent.change(screen.getByLabelText("Product name"), {
      target: { value: "Updated Product" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "300" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /edit product/i }));

    await waitFor(() => {
      expect(updateProductMock).toHaveBeenCalledWith("1", {
        title: "Updated Product",
        category: "Category 1",
        price: "300",
        image: "image.jpg",
        description: "Description 1",
      });
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Success!",
        text: "Product saved",
        icon: "success",
        confirmButtonText: "OK",
      });
      expect(onDataMock).toHaveBeenCalledWith(false);
    });
  });

  it('closes modal on cancel button click', () => {
    const onDataMock = jest.fn();
    render(<ProductsAdd onData={onDataMock} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onDataMock).toHaveBeenCalledWith(false);
  });
});
