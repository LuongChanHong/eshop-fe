import { productService } from "../Services/ProductService";
export const getAllProduct = () => {
  return async () => {
    try {
      const result = await productService.getAllProduct();
      console.log("result:", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
};
