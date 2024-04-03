import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios("http://localhost:5000/api/products");
      setProducts(result.data);
    };
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    setProducts(products.filter((product) => product.id !== id));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Products</h1>
      </div>
      <Link href="/add" className={styles.addProductLink}>
        Add Product
      </Link>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.productPrice}>${product.price}</div>
          <div className={styles.actions}>
            <Link
              href={`/edit/${product.id}`}
              className={`${styles.button} ${styles.edit}`}
            >
              Edit
            </Link>
            <button
              onClick={() => deleteProduct(product.id)}
              className={`${styles.button} ${styles.delete}`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
