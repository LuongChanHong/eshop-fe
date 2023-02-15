import { baseService } from "./baseService";

export class OrderService extends baseService {
  constructor() {
    super();
  }
  createOrder = (data) => {
    return this.post("/order/create", data);
  };
}

export const orderService = new OrderService();
