/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

// Suử dụng như 1 lớp đôi tượng nên cần phải viết hoa tên lớp
export class CartService extends baseService {
  constructor() {
    super();
  }
  addToCart = (data) => {
    return this.post("/cart/add-item", data);
  };
  getCartByUserId = (userId) => {
    return this.get(`/cart/get-by-user-id?id=${userId}`);
  };
  updateQuantity = (data) => {
    return this.post("/cart/update-quantity", data);
  };
}

export const cartService = new CartService();
