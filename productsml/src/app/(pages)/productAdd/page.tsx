import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function ProductsAdd() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El valor es requerido"),
    description: Yup.string().required("El valor es requerido"),
    price: Yup.number()
      .typeError("Ingresa un valor válido")
      .required("El valor es requerido")
      .max(100000)
      .typeError("El valor maximo del producto es $100,000.00")
      .moreThan(0, "El valor mínimo es de $1.00"),
    category: Yup.string().required("El valor es requerido"),
    image: Yup.string(),
  });

  const handleSubmit = async (values: {
    name: string;
    description: string;
    price: string;
    category: string;
  }) => {
    console.log(values);
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.name,
          price: 200,
          description: values.description,
          image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          category: "electronic",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitUpdate = async (values: {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
  }) => {
    console.log(values);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${values.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.name,
            price: 200,
            description: values.description,
            image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            category: "electronic",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Agregar Producto
          </h2>
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              category: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Nombre de producto
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Ingresa nombre de producto"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Categoría
                      </label>
                      <Field
                        as="select"
                        name="category"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="error-message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">
                        Precio
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
                  <label className="block text-sm font-medium">
                    Imagen de producto
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
                  <label className="block text-sm font-medium">
                    Descripción
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
                  <label htmlFor="my_modal_6" className="btn">
                    Cancelar
                  </label>
                  <button className="btn" type="submit">
                    Crear nuevo producto
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
