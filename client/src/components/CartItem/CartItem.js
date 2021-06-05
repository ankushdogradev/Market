import React from "react";

const CartItem = ({ item }) => {
  return (
    <>
      <div className="item-container">
        {console.log("CARTITEM::", item.productID)}
      </div>
    </>
  );
};

export default CartItem;
