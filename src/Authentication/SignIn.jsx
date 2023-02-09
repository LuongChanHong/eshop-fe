import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { compare } from "bcryptjs";

import { signInAction } from "../Redux/Actions/userAction";

// import { addSession } from "../Redux/Action/ActionSession";
import "./Auth.css";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";

function SignIn(props) {
  //listCart được lấy từ redux
  // const listCart = useSelector((state) => state.Cart.listCart);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const [checkPush, setCheckPush] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await UserAPI.getAllData();
  //     console.log("response.data:", response.data);
  //     setUser(response.data);
  //   };

  //   fetchData();
  // }, []);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkInputError = () => {
    if (!email) {
      setErrorEmail(true);
      return false;
    } else {
      if (!password) {
        setErrorEmail(false);
        setErrorPassword(true);
        return false;
      } else {
        setErrorPassword(false);
        if (!validateEmail(email)) {
          setEmailRegex(true);
          return false;
        } else {
          setEmailRegex(false);
          return true;
        }
      }
    }
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    const isAnyInputError = checkInputError();
    if (isAnyInputError) {
      const response = dispatch(
        signInAction({
          email: email,
          password: password,
        })
      );

      response.then((data) => {
        console.log("data:", data);

        // Trường hợp đăng nhập thành công, server trả về
        if (data.userId) {
          localStorage.setItem("id_user", data.userId);
          navigate("/");
        } else {
          if (data.msg.toLowerCase().includes("email")) {
            setErrorEmail(true);
            setErrorPassword(false);
          }
          if (data.msg.toLowerCase().includes("password")) {
            setErrorPassword(true);
            setErrorEmail(false);
          }
        }
      });
    }
  };

  //Hàm này dùng để đưa hết tất cả carts vào API của user
  // useEffect(() => {
  //   console.log("checkPush:", checkPush);
  //   const fetchData = async () => {
  //     //Lần đầu sẽ không thực hiện insert được vì addCart = ''
  //     if (checkPush === true) {
  //       for (let i = 0; i < listCart.length; i++) {
  //         //Nó sẽ lấy idUser và idProduct và count cần thêm để gửi lên server
  //         const params = {
  //           idUser: localStorage.getItem("id_user"),
  //           idProduct: listCart[i].idProduct,
  //           count: listCart[i].count,
  //         };

  //         const query = "?" + queryString.stringify(params);

  //         const response = await CartAPI.postAddToCart(query);
  //         console.log(response);
  //       }

  //       setRedirect(true);
  //     }
  //   };

  //   fetchData();
  // }, [checkPush]);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const errorRender = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center pb-5">
        {emailRegex && (
          <span className="text-danger">* Incorrect Email Format</span>
        )}
        {errorEmail && (
          <span className="text-danger">* Please Check Your Email</span>
        )}
        {errorPassword && (
          <span className="text-danger">* Please Check Your Password</span>
        )}
      </div>
    );
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign In</span>
          {errorRender()}
          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            <button className="login100-form-btn" onClick={(e) => onSubmit(e)}>
              Sign in
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
