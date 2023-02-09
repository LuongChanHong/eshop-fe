import { baseService } from "./baseService";

export class ProductService extends baseService {
  constructor() {
    super();
  }
  getAllProduct = () => {
    return this.get("/products/getAllProducts");
  };
}

export const productService = new ProductService();
