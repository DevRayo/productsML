import { useState } from "react";
import ProductsAdd from "../(pages)/productAdd/page";
import styles from "../styles/Navbar.module.scss";
import Image from "next/image";

export default function Navbar({ typeSection }: any) {
  const [typeOptions, _setTypeOptions] = useState(typeSection);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const handleAction = (data: boolean) => setIsModalOpen(data);

  return (
    <>
      <div className={`${styles.navbar_structure} navbar bg-base-100`}>
        <div className="flex-1">
          <div className="img_container">
            <Image
              src="/images/logo_fake.png"
              alt="logo"
              fill
              sizes="100%"
              className="navbar_logo img_load"
            />
          </div>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <label className="btn" onClick={openModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {typeOptions === "productList"
                  ? "Add new product"
                  : "Edit product"}
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal modal-open">
              <div className="modal-box">
                <ProductsAdd onData={handleAction}></ProductsAdd>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
