import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import convertMoney from "../../convertMoney";

ListCart.propTypes = {
  cartItems: PropTypes.array,
  deleteCartItem: PropTypes.func,
  changeQuantity: PropTypes.func,
};

ListCart.defaultProps = {
  cartItems: [],
  deleteCartItem: null,
  changeQuantity: null,
};

function ListCart(props) {
  const { cartItems, deleteCartItem, changeQuantity } = props;

  const handlerQuantityChange = (e) => {
    console.log(e.target.item);
  };

  const deleteItem = (productId) => {
    if (!deleteCartItem) {
      return;
    }
    deleteCartItem(productId);
  };

  const reduceQuantity = (productId, quantity) => {
    if (!changeQuantity) {
      return;
    }
    if (quantity === 1) {
      return;
    }
    //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    const updatedQuantity = parseInt(quantity) - 1;
    changeQuantity(productId, updatedQuantity);
  };

  const addQuantity = (productId, quantity) => {
    if (!changeQuantity) {
      return;
    }
    const updatedQuantity = parseInt(quantity) + 1;
    changeQuantity(productId, updatedQuantity);
  };

  return (
    <div className="table-responsive mb-4">
      <table className="table">
        <thead className="bg-light">
          <tr className="text-center">
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Image</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Product</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Price</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Quantity</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Total</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Remove</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((item, index) => (
              <tr className="text-center" key={index}>
                {/* IMAGE - START */}
                <td className="pl-0 border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor d-block animsition-link"
                      to={`/detail/${item.idProduct}`}
                    >
                      <img src={item.img} alt="..." width="70" />
                    </Link>
                  </div>
                </td>
                {/* IMAGE - END */}
                {/* PRODUCT NAME - START */}
                <td className="align-middle border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor h6 animsition-link"
                      to={`/detail/${item.idProduct}`}
                    >
                      {item.productName}
                    </Link>
                  </div>
                </td>
                {/* PRODUCT NAME - END */}
                {/* PRICE - START */}
                <td className="align-middle border-0">
                  <p className="mb-0 small">{convertMoney(item.price)} VND</p>
                </td>
                {/* PRICE - END */}
                {/* QUANTITY - START */}
                <td className="align-middle border-0">
                  <div className="quantity justify-content-center">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        reduceQuantity(item.productId, item.quantity)
                      }
                    >
                      <i className="fas fa-caret-left"></i>
                    </button>
                    <input
                      className="form-control form-control-sm border-0 shadow-0 p-0"
                      type="text"
                      value={item.quantity}
                      onChange={handlerQuantityChange}
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => addQuantity(item.productId, item.quantity)}
                    >
                      <i className="fas fa-caret-right"></i>
                    </button>
                  </div>
                </td>
                {/* QUANTITY - END */}
                {/* TOTAL PRICE - START */}
                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {convertMoney(
                      parseInt(item.price) * parseInt(item.quantity)
                    )}{" "}
                  </p>
                </td>
                {/* TOTAL PRICE - END */}
                {/* REMOVE PRODUCT BUTTON - START */}
                <td className="align-middle border-0">
                  <a
                    className="reset-anchor remove_cart"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItem(item.productId)}
                  >
                    <i className="fas fa-trash-alt small text-muted"></i>
                  </a>
                </td>
                {/* REMOVE PRODUCT BUTTON - END */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCart;
