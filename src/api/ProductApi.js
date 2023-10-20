import axios from "axios";

const productData = async () => {
  const products = await axios.get(
    "https://fakestoreapiserver.reactbd.com/products"
  );
  return products;
};

export { productData };
