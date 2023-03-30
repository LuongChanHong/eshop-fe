import Axios from "axios";
import { serverPath } from "../path";
export class baseService {
  get = (url) => {
    return Axios({
      withCredentials: true,
      url: `${serverPath}${url}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  post = (url, model) => {
    return Axios({
      withCredentials: true,
      url: `${serverPath}${url}`,
      method: "POST",
      data: model,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  delete = (url) => {
    return Axios({
      withCredentials: true,
      url: `${serverPath}${url}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
