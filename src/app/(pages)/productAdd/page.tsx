import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  addProduct,
  updateProduct,
  useCategory,
} from "@/app/services/products";
import { Product } from "@/app/types/product";
import { useAppContext } from "@/context";
import Image from "next/image";
import Swal from "sweetalert2";

export default function ProductsAdd({ onData }: any) {
  const { productSelected } = useAppContext();
  const { category = [] } = useCategory();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Add value valid")
      .required("Price is required")
      .max(100000)
      .typeError("Max value 100,000")
      .moreThan(0, "Min value $1.00"),
    category: Yup.string().required("Category is required"),
    image: Yup.string(),
  });

  const showAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "Product saved",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = async (product: Product) => {
    try {
      if (productSelected) {
        await updateProduct(
          productSelected.id ? productSelected.id.toString() : "",
          product
        );
      } else {
        await addProduct(product);
      }
      closeModal();
      showAlert();
    } catch (error) {
      closeModal();
    }
  };

  const closeModal = async () => {
    onData(false);
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="max-w-md w-full p-8">
          <div className="img_container">
            <Image
              src="/images/logo_fake.png"
              alt="logo"
              sizes="100%"
              className="logo"
              fill
            />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">
            {productSelected ? "Edit product" : "Add product"}
          </h2>
          <Formik
            initialValues={{
              title: productSelected ? productSelected.title : "",
              category: productSelected ? productSelected.category : "",
              price: productSelected ? productSelected.price : 0,
              image: productSelected ? productSelected.image : "",
              description: productSelected ? productSelected.description : "",
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-medium" htmlFor="title">
                    Product name
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ingresa nombre de producto"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        {category.map((e: any) => (
                          <option key={e}>{e}</option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <Field
                        type="text"
                        id="price"
                        name="price"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Ingresa precio"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="error-message"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium" htmlFor="image">
                    Product image
                  </label>
                  <Field
                    type="text"
                    id="image"
                    name="image"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ingresa nombre de producto"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your message"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="modal-action">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-100 modal_buttons">
                    <button className="btn" type="submit">
                      {productSelected ? "Edit product" : "Create new product"}
                    </button>
                    <label
                      onClick={closeModal}
                      className="btn btn-active btn-link"
                    >
                      Cancel
                    </label>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
