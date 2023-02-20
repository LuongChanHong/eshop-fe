/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

// Suử dụng như 1 lớp đôi tượng nên cần phải viết hoa tên lớp
export class CartService extends baseService {
  constructor() {
    super();
  }
  addToCart = async (data) => {
    try {
      await this.post("/cart/add-item", data);
    } catch (error) {
      console.log(error);
    }
  };
  getCartByUserId = (userId) => {
    return this.get(`/cart/get-by-user-id?id=${userId}`);
  };
  updateQuantity = async (data) => {
    try {
      await this.post("/cart/update-quantity", data);
    } catch (error) {
      console.log(error);
    }
  };
  deleteItem = async (userId, productId) => {
    try {
      await this.delete(
        `/cart/delete-item?userId=${userId}&productId=${productId}`
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export const cartService = new CartService();
