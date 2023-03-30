import jsCookie from "js-cookie";
import { userService } from "../Services/UserService";
import { USER } from "./Types/userType";
import { createAction } from ".";

export const signInAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await userService.signIn(data);
      dispatch(createAction(USER.SIGN_IN, result.data));
      // console.log("result:", result);
      return result.data;
    } catch (error) {
      console.log(error);
      alert(error.response);
    }
  };
};

export const signUpAction = async (data) => {
  try {
    const result = await userService.signUp(data);
    // console.log("result:", result);
    return result.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data);
  }
};

export const signOutAction = () => {
  return async (dispatch) => {
    try {
      await userService.signOut();
      dispatch(createAction(USER.SIGN_OUT));
      jsCookie.remove("cookieRole");
      jsCookie.remove("cookieUserId");
      jsCookie.remove("cookieToken");
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
};

export const getInfo = async (id) => {
  try {
    const result = await userService.getInfo(id);
    // console.log("result.data:", result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
