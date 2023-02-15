const initalState = {
  cartItems: [],
};

const reducer = (state = initalState, action) => {
  let cartItems = [...state.cartItems];
  switch (action.type) {
    case "ADD_CART":
      // console.log(action.payload);
      //Lấy dữ liệu được truyền tới
      const selectedItem = action.payload;

      if (cartItems.length < 1) {
        cartItems.push(selectedItem);
      } else {
        //Tìm Vị Trí của sản phẩm đã mua
        const addIndex = cartItems.findIndex((item) => {
          return item.productId === selectedItem.productId;
        });

        // console.log("addIndex:", addIndex);
        // Nếu này chưa được mua thì mình push vào
        // Còn đã từng mua rồi thì mình update tại vị trí addIndex mà mình vừa tìm được
        if (addIndex === -1) {
          cartItems.push(selectedItem);
          // console.log("Push");
        } else {
          cartItems[addIndex].quantity =
            parseInt(cartItems[addIndex].quantity) +
            parseInt(selectedItem.quantity);
          // console.log("Update");
        }
      }

      state.cartItems = cartItems;
      return { ...state };

    case "CHANGE_ITEM_QUANTITY":
      const changeItem = action.payload;
      // console.log("cartItems:", cartItems);
      const changeIndex = cartItems.findIndex((item) => {
        return item.productId === changeItem.productId;
      });

      // console.log("changeIndex:", changeIndex);
      if (changeIndex === -1) {
        console.log("Cart item not found");
      } else {
        cartItems[changeIndex].quantity = parseInt(changeItem.quantity);
      }
      state.cartItems = cartItems;
      return { ...state };

    case "DELETE_CART_ITEM":
      const deleteId = action.payload;
      // console.log("cartItems:", cartItems);
      const deleteIndex = cartItems.findIndex((item) => {
        return item.productId === deleteId;
      });

      // console.log("deleteIndex:", deleteIndex);
      if (deleteIndex === -1) {
        console.log("Cart item not found");
      } else {
        cartItems.splice(deleteIndex, 1);
      }
      state.cartItems = cartItems;
      return { ...state };

    case "RESET_CART":
      state = {
        cartItems: [],
      };
      return { ...state };

    // case "UPDATE_CART":
    //   const data_update_cart = action.payload;

    //   const update_cart = state.cartItems;

    //   const index = update_cart.findIndex((value) => {
    //     return value.productId === data_update_cart.productId;
    //   });

    //   update_cart[index].count = data_update_cart.count;

    //   state = {
    //     userId: state.userId,
    //     cartItems: update_cart,
    //   };

    //   return state;

    default:
      return state;
  }
};

export default reducer;
