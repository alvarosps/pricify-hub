const db = require("../db");

const getProductById = async (productId) => {
  const res = await db.query("SELECT * FROM products WHERE id = $1", [
    productId,
  ]);
  return res.rows[0];
};

const createProduct = async (name, price) => {
  const res = await db.query(
    "INSERT INTO products(name, price, is_published, published_at) VALUES($1, $2, TRUE, NOW()) RETURNING *",
    [name, price],
  );
  return res.rows[0];
};

const updateProduct = async (productId, name, price) => {
  const res = await db.query(
    "INSERT INTO product_versions(product_id, name, price, created_at, is_published) VALUES($1, $2, $3, NOW(), FALSE) RETURNING *",
    [productId, name, price],
  );
  return res.rows[0];
};

const listPublishedProducts = async () => {
  const res = await db.query(
    "SELECT * FROM products WHERE is_published = TRUE",
  );
  return res.rows;
};

const publishProducts = async (productIds) => {
  const promises = productIds.map(async (productId) => {
    const versionRes = await db.query(
      "SELECT * FROM product_versions WHERE product_id = $1 ORDER BY created_at DESC LIMIT 1",
      [productId],
    );
    const latestVersion = versionRes.rows[0];

    if (latestVersion) {
      await db.query(
        "UPDATE products SET name = $1, price = $2, is_published = TRUE, published_at = NOW() WHERE id = $3",
        [latestVersion.name, latestVersion.price, productId],
      );
    }
  });

  await Promise.all(promises);

  return listPublishedProducts();
};

module.exports = {
  getProductById,
  createProduct,
  updateProduct,
  listPublishedProducts,
  publishProducts,
};
