import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/product/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>Product Screen, OPPAI's are best</h1>
      {console.log(product)}
    </div>
  );
};

export default ProductScreen;
