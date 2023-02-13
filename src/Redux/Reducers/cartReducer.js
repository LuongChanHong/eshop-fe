const initalState = {
  cartItems: [],
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_CART":
      console.log(action.payload);

      //Lấy dữ liệu được truyền tới
      const selectedItem = action.payload;

      //Lấy dữ liệu có sẵn trong state
      const cartItems = state.cartItems;

      if (cartItems.length < 1) {
        cartItems.push(selectedItem);
      } else {
        //Tìm Vị Trí của sản phẩm đã mua
        const index = cartItems.findIndex((item) => {
          return item.productId === selectedItem.productId;
        });

        console.log("index:", index);
        // Nếu này chưa được mua thì mình push vào
        // Còn đã từng mua rồi thì mình update tại vị trí index mà mình vừa tìm được
        if (index === -1) {
          cartItems.push(selectedItem);
          console.log("Push");
        } else {
          cartItems[index].quantity =
            parseInt(cartItems[index].quantity) +
            parseInt(selectedItem.quantity);
          console.log("Update");
        }
      }

      state.cartItems = cartItems;

      console.log(state);

      return { ...state };

    case "RESET_CART":
      state = {
        userId: "",
        cartItems: [],
      };
      return { ...state };

    case "UPDATE_CART":
      const data_update_cart = action.payload;

      const update_cart = state.cartItems;

      const index = update_cart.findIndex((value) => {
        return value.productId === data_update_cart.productId;
      });

      update_cart[index].count = data_update_cart.count;

      state = {
        userId: state.userId,
        cartItems: update_cart,
      };

      return state;

    default:
      return state;
  }
};

export default reducer;
