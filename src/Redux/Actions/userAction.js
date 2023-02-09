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
      alert(error.response.data);
    }
  };
};

export const signOutAction = (dispatch) => {
  try {
    dispatch(createAction(USER.SIGN_OUT));
  } catch (error) {
    console.log(error);
    alert(error.response.data);
  }
};

// export const signOutAction = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(createAction(USER.SIGN_OUT));
//     } catch (error) {
//       console.log(error);
//       alert(error.response.data);
//     }
//   };
// };

export const signUpAction = (thongTinDangKi, callBack) => {
  return async (dispatch) => {
    try {
      const result = await userService.signUp(thongTinDangKi);
      dispatch(createAction(USER.SIGN_OUT));
      callBack();

      alert("Đăng kí thành công");
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };
};
