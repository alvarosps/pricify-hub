import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/EditProduct.module.scss";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/products/${id}`, {
      name,
      price,
    });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formLabel}>Name:</div>
      <input
        className={styles.formInput}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className={styles.formLabel}>Price:</div>
      <input
        className={styles.formInput}
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className={styles.formButton} type="submit">
        Update Product
      </button>
    </form>
  );
}
