import { USER } from "../Actions/Types/userType";

const initialState = {
  userId: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.SIGN_IN:
      state.userId = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
