import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import convertMoney from "../convertMoney";
import "./Checkout.css";

import { createOrder } from "../Redux/Actions/orderAction";
import { getInfo } from "../Redux/Actions/userAction";
import { getCart } from "../Redux/Actions/cartAction";

// import io from "socket.io-client";
// const socket = io("http://localhost:5000");

function Checkout(props) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [fullname, setFullname] = useState("");
  const [fullnameError, setFullnameError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);

  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const cookie = jsCookie.get("cookieToken");

  const getTotal = (itemList) => {
    let sub_total = 0;
    itemList.forEach((item) => {
      sub_total += item.price * item.quantity;
    });

    setTotal(sub_total);
  };
  const getCartByUserId = async () => {
    const response = await getCart(userId);
    console.log("response.items:", response.items);
    getTotal(response.items);
    setCartItems(response.items);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getInfo(userId);
      // console.log("response", response);
      setFullname(response.fullname);
      setEmail(response.email);
      setPhone(response.phone);
      setAddress(response.address || "");
    };
    // Nếu đã có cookie đăng nhập từ server thì được phép lấy thông tin cart của user
    if (cookie == undefined) {
      navigate("/signin");
    } else {
      getCartByUserId();
      getUserInfo();
    }
  }, []);

  const inputValidation = () => {
    if (!fullname) {
      setFullnameError(true);
      setEmailError(false);
      setPhoneError(false);
      setAddressError(false);
      return false;
    } else {
      if (!email) {
        setFullnameError(false);
        setEmailError(true);
        setPhoneError(false);
        setAddressError(false);
        return false;
      } else {
        setPhoneError(false);
        setAddressError(false);
        setFullnameError(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          setFullnameError(false);
          setEmailError(false);
          setPhoneError(false);
          setAddressError(false);
          return false;
        } else {
          setEmailRegex(false);

          if (!phone) {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(true);
            setAddressError(false);
            return false;
          } else {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(false);
            setAddressError(false);

            if (!address) {
              setFullnameError(false);
              setEmailError(false);
              setPhoneError(false);
              setAddressError(true);
            } else {
              return true;
            }
          }
        }
      }
    }
  };

  // Nếu đã có cookie đăng nhập từ server thì được phép tạo order
  const handlerSubmit = () => {
    const isInputValid = inputValidation();
    if (isInputValid && cookie) {
      console.log("Thanh Cong");

      // setLoad(!load);
      createOrder({
        user: {
          userId: userId,
          fullname: fullname,
          email: email,
          phone: phone,
          address: address,
        },
        products: cartItems,
        totalPrice: total,
      });

      navigate("/history");
    }
  };

  const onChangeName = (e) => {
    setFullname(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div>
      {load && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}

      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            {/* BREADCRUMB - START */}
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Checkout</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/cart">Cart</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            {/* BREADCRUMB - END */}
          </div>
        </section>

        {!success && (
          <section className="py-5">
            <h2 className="h5 text-uppercase mb-4">Billing details</h2>
            <div className="row">
              {/* USER INFO FORM - START */}
              <div className="col-lg-8">
                <form>
                  <div className="row">
                    {/* name input - start */}
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Fullname"
                      >
                        Full Name:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={fullname}
                        onChange={onChangeName}
                        type="text"
                        placeholder="Enter Your Full Name Here!"
                      />
                      {fullnameError && (
                        <span className="text-danger">
                          * Please Check Your Full Name!
                        </span>
                      )}
                    </div>
                    {/* name input - end */}

                    {/* email input - start */}
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Email"
                      >
                        Email:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={email}
                        onChange={onChangeEmail}
                        type="text"
                        placeholder="Enter Your Email Here!"
                      />
                      {emailError && (
                        <span className="text-danger">
                          * Please Check Your Email!
                        </span>
                      )}
                      {emailRegex && (
                        <span className="text-danger">
                          * Incorrect Email Format
                        </span>
                      )}
                    </div>
                    {/* email input - end */}

                    {/* phone input - start */}
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Phone"
                      >
                        Phone Number:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={phone}
                        onChange={onChangePhone}
                        type="text"
                        placeholder="Enter Your Phone Number Here!"
                      />
                      {phoneError && (
                        <span className="text-danger">
                          * Please Check Your Phone Number!
                        </span>
                      )}
                    </div>
                    {/* phone input - end */}

                    {/* address input - start */}
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Address:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        value={address}
                        onChange={onChangeAddress}
                        type="text"
                        placeholder="Enter Your Address Here!"
                      />
                      {addressError && (
                        <span className="text-danger">
                          * Please Check Your Address!
                        </span>
                      )}
                    </div>
                    {/* address input - end */}

                    {/* order button - start */}
                    <div className="col-lg-12 form-group">
                      <a
                        className="btn btn-dark"
                        style={{ color: "white" }}
                        type="submit"
                        onClick={handlerSubmit}
                      >
                        Place order
                      </a>
                    </div>
                    {/* order button - end */}
                  </div>
                </form>
              </div>
              {/* USER INFO FORM - END */}

              {/* ORDER DETAIL - START */}
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Your order</h5>
                    <ul className="list-unstyled mb-0">
                      {cartItems &&
                        cartItems.map((item, i) => (
                          <div key={i}>
                            <li className="d-flex align-items-center justify-content-between">
                              <strong className="small font-weight-bold">
                                {item.productName}
                              </strong>
                              <br></br>
                              <span className="text-muted small">
                                {convertMoney(item.price)} x {item.quantity}
                              </span>
                            </li>
                            <li className="border-bottom my-2"></li>
                          </div>
                        ))}
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>{convertMoney(total)} VND</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* ORDER DETAIL - END */}
            </div>
          </section>
        )}

        {/* {success && (
          <section className="py-5">
            <div className="p-5">
              <h1>You Have Successfully Ordered!</h1>
              <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
            </div>
          </section>
        )} */}
      </div>
    </div>
  );
}

export default Checkout;
