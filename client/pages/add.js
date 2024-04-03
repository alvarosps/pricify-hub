import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/AddProduct.module.scss";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", { name, price });
    router.push("/");
  };

  return (
    <div className={styles.addProductForm}>
      <h1>Add a New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          {/* Associate the label with the input using htmlFor and id */}
          <label htmlFor="productName" className={styles.formLabel}>
            Name:
          </label>
          <input
            id="productName"
            className={styles.formInput}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productPrice" className={styles.formLabel}>
            Price:
          </label>
          <input
            id="productPrice"
            className={styles.formInput}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className={styles.formButton} type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
