import { orderService } from "../Services/OrderService";
export const createOrder = async (data) => {
  try {
    const result = await orderService.createOrder(data);
    // console.log("result:", result);
  } catch (error) {
    console.log(error);
  }
};
