"use client";
import { useRouter } from "next/navigation";
import styles from "../styles/Product.module.scss";
import Image from "next/image";

export default function Product({ information }: any) {
  const router = useRouter();
  const openProduct = (e: any) => {
    router.push("/productDetails");
  };

  return (
    <>
      <div className=" p-4">
        <div
          className={`${styles.card_product} card bg-base-100 w-96 shadow-xl`}
        >
          <figure className={`${styles.figureCard}`}>
            <Image
              src={information.image}
              alt="example"
              width={800}
              height={600}
              layout="responsive"
            />
          </figure>
          <div className={`${styles.cardBody} card-body`}>
            <div>
              <h2 className={styles.product_text}>{information.title}</h2>
            </div>
            <p className={`${styles.cardPrice}`}>Price: ${information.price}</p>
            <p className={`${styles.cardCategory}`}>
              {" "}
              Category: {information.category}
            </p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-block btn-link"
                onClick={openProduct}
              >
                See more
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
