import { baseService } from "./baseService";

export class ProductService extends baseService {
  constructor() {
    super();
  }
  getAllProduct = () => {
    return this.get("/product/getAllProducts");
  };
}

export const productService = new ProductService();
