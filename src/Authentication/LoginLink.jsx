import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { signOutAction } from "../Redux/Actions/userAction";

function LoginLink(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRedirect = () => {
    localStorage.clear();
    signOutAction(dispatch);
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
