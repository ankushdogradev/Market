import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productID === item.productID
      );

      if (existItem) {
        return {
          /*If the item exist copy the existing state + add existing item
              to existing array by map [if id's doesnot match it will return same array]*/
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productID === existItem.productID ? item : x
          ),
        };
      } else {
        /*   if the item does not exist copy the existing state + add new item
             by: cartItems: [existing items, new item]*/
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        // If the deleted Item ID != to other ID's then add the item to cart
        // It will not add the product with same ID.
        cartItems: state.cartItems.filter(
          (x) => x.productID !== action.payload
        ),
      };
    default:
      return state;
  }
};
