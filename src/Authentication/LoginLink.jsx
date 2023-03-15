import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signOutAction } from "../Redux/Actions/userAction";

function LoginLink() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRedirect = () => {
    localStorage.clear();
    dispatch(signOutAction());
    navigate("/signin");
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
