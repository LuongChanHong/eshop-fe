import { CART } from "./Types/cartType";
import { createAction } from ".";
import { cartService } from "../Services/cartService";

export const addToCart = async (data) => {
  try {
    await cartService.addToCart(data);
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (userId) => {
  try {
    const result = await cartService.getCartByUserId(userId);
    // console.log("result:", result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateQuantity = async (data) => {
  try {
    await cartService.updateQuantity(data);
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
