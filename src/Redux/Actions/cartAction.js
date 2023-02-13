import { CART } from "./Types/cartType";
import { createAction } from ".";

export const addToCart = (dispatch, item) => {
  try {
    dispatch(createAction(CART.ADD_CART, item));
  } catch (error) {
    console.log(error);
  }
};
