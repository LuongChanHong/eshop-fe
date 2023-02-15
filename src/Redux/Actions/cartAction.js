import { CART } from "./Types/cartType";
import { createAction } from ".";

export const addToCart = (dispatch, item) => {
  try {
    dispatch(createAction(CART.ADD_CART, item));
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (dispatch, productId) => {
  try {
    dispatch(createAction(CART.DELETE_CART_ITEM, productId));
  } catch (error) {
    console.log(error);
  }
};

export const changeItemQuantity = (dispatch, item) => {
  try {
    dispatch(createAction(CART.CHANGE_ITEM_QUANTITY, item));
  } catch (error) {
    console.log(error);
  }
};

export const resetCart = (dispatch) => {
  try {
    dispatch(createAction(CART.RESET_CART));
  } catch (error) {
    console.log(error);
  }
};
