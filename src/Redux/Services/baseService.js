import Axios from "axios";
import { serverPath } from "../path";
export class baseService {
  get = (url) => {
    return Axios({
      withCredentials: true,
      url: `${serverPath}${url}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "include",
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
        "content-type": "application/json",
      },
    });
  };

  delete = (url) => {
    return Axios({
      withCredentials: true,
      url: `${serverPath}${url}`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
  };
}
