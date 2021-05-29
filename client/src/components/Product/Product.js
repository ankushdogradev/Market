import React from "react";
import "./Product.scss";

// or we could have wrote const Product = ( props ) => ...
// but then we have to write props.product._id and so on
const Product = ({ product }) => {
  return (
    <>
      <div className="card">
        {/* {console.log(`Product Name: ${product.name} & ID: ${product._id}`)} */}
      </div>
    </>
  );
};

export default Product;
