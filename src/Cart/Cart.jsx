import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListCart from "./Component/ListCart";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
// import queryString from "query-string";
import convertMoney from "../convertMoney";
import { useNavigate } from "react-router-dom";

import {
  deleteItem,
  getCart,
  updateQuantity,
} from "../Redux/Actions/cartAction";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userId);
  const [total, setTotal] = useState();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartByUserId = async () => {
      const response = await getCart(userId);
      console.log("response.items:", response.items);
      setCartItems(response.items);
    };
    getCartByUserId();
  }, []);

  // Hàm truyền vào mỗi quantity btn thuộc item trong comp ListCart
  const changeQuantity = async (productId, quantity) => {
    const data = {
      userId: userId,
      productId: productId,
      quantity: quantity,
    };
    await updateQuantity(data);

    // cập nhập lại cart sau khi thêm/ bớt product quantity
    const updatedCart = await getCart(userId);
    setCartItems(updatedCart.items);

    alertify.set("notifier", "position", "bottom-left");
    alertify.success("Bạn Đã Sửa Hàng Thành Công!");
  };

  const deleteCartItem = async (productId) => {
    await deleteItem(userId, productId);

    // cập nhập lại cart sau khi xóa 1 product
    const updatedCart = await getCart(userId);
    setCartItems(updatedCart.items);

    alertify.set("notifier", "position", "bottom-left");
    alertify.error("Bạn Đã Xóa Hàng Thành Công!");
  };

  const onCheckout = () => {
    if (cartItems.length === 0) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Lại Giỏ Hàng!");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="container">
      {/* BREADCRUMB - STAR T*/}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Cart</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* BREADCRUMB - END */}

      <section className="py-5">
        <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <ListCart
              cartItems={cartItems}
              deleteCartItem={deleteCartItem}
              changeQuantity={changeQuantity}
            />

            {/* NAVIGAVE BUTTONS - START */}
            <div className="bg-light px-4 py-3">
              <div className="row align-items-center text-center">
                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                  <Link
                    className="btn btn-link p-0 text-dark btn-sm"
                    to={`/shop`}
                  >
                    <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                    Continue shopping
                  </Link>
                </div>
                <div className="col-md-6 text-md-right">
                  <span
                    className="btn btn-outline-dark btn-sm"
                    onClick={onCheckout}
                  >
                    Proceed to checkout
                    <i className="fas fa-long-arrow-alt-right ml-2"></i>
                  </span>
                </div>
              </div>
            </div>
            {/* NAVIGAVE BUTTONS - END */}
          </div>
          {/* TOTAL PRICE - START */}
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Cart total</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="text-uppercase small font-weight-bold">
                      Subtotal
                    </strong>
                    <span className="text-muted small">
                      {convertMoney(total)} VND
                    </span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <strong className="text-uppercase small font-weight-bold">
                      Total
                    </strong>
                    <span>{convertMoney(total)} VND</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* TOTAL PRICE - END */}
        </div>
      </section>
    </div>
  );
}

export default Cart;
