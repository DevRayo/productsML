"use client";
import { useRouter } from "next/navigation";
import styles from "../styles/Product.module.scss";
import Image from "next/image";

export default function Product({ product }: any) {
  const router = useRouter();
  const openProduct = () => {
    router.push(`/productDetails/${product.id}`);
  };
  return (
    <>
      <div className=" p-4">
        <div
          className={`${styles.card_product} card bg-base-100 w-96 shadow-xl`}
        >
          <figure className={`${styles.figureCard}`}>
            <Image
              src={product.image}
              alt="example"
              width={800}
              height={600}
              layout="responsive"
            />
          </figure>
          <div className={`${styles.cardBody} card-body`}>
            <div>
              <h2 className={styles.product_text}>{product.title}</h2>
            </div>
            <p className={`${styles.cardPrice}`}>Price: ${product.price}</p>
            <p className={`${styles.cardCategory}`}>
              {" "}
              Category: {product.category}
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
