import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import convertMoney from "../convertMoney";

import HistoryAPI from "../API/HistoryAPI";

import { getOrderById } from "../Redux/Actions/orderAction";

function DetailHistory() {
  const { id } = useParams();

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrderById(id);
      console.log("response:", response);

      setCart(response.products);
      setTotalPrice(response.totalPrice);
      setUserInfo(response.user);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Detail Order</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active">Detail</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="p-5">
        <h1 className="h2 text-uppercase">user Info Order</h1>
        <p>
          <strong>ID User: {userInfo.userId}</strong>
        </p>
        <p>
          <strong>Full Name: {userInfo.fullname}</strong>
        </p>
        <p>
          <strong>Phone: {userInfo.phone}</strong>
        </p>
        <p>
          <strong>Address: {userInfo.address}</strong>
        </p>
        <p>
          <strong>Total: {convertMoney(totalPrice)} VND</strong>
        </p>
      </div>

      <div className="table-responsive pt-5 pb-5">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">
                  ID Product
                </strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Image</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Name</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Price</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Count</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((value) => (
                <tr className="text-center" key={value.idProduct}>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.productId}</h6>
                  </td>
                  <td className="pl-0 border-0">
                    <div className="media align-items-center justify-content-center">
                      <Link
                        className="reset-anchor d-block animsition-link"
                        to={`/detail/${value.idProduct}`}
                      >
                        <img src={value.img} alt="..." width="200" />
                      </Link>
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.productName}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.price}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.quantity}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailHistory;
