import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import convertMoney from "../convertMoney";

import jsCookie from "js-cookie";

import {
  getProductDetail,
  getAllProduct,
} from "../Redux/Actions/productAction";

import { addToCart } from "../Redux/Actions/cartAction";

function Detail() {
  const [detail, setDetail] = useState({});
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const userId = useSelector((state) => state.user.userId);
  const cookie = jsCookie.get("cookieToken");

  // const [star, setStar] = useState(1);

  // const [comment, setComment] = useState("");

  // id_user đã đăng nhập
  // const idUser = useSelector((state) => state.Session.idUser);

  // Listcomment
  // const [list_comment, set_list_comment] = useState([]);

  // state này dùng để load lại comment khi user gửi comment lên
  // const [load_comment, set_load_comment] = useState(false);

  // Hàm này dùng để lấy dữ liệu comment
  // Hàm này sẽ chạy lại phụ thuộc vào id Param
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const params = {
  //       idProduct: id,
  //     };

  //     const query = "?" + queryString.stringify(params);

  //     const response = await CommentAPI.getCommentProduct(query);
  //     console.log(response);

  //     set_list_comment(response);
  //   };

  //   fetchData();
  // }, [id]);

  // Hàm thay đổi sao đánh giá
  // const onChangeStar = (e) => {
  //   setStar(e.target.value);
  // };

  // Hàm thay đổi comment
  // const onChangeComment = (e) => {
  //   setComment(e.target.value);
  // };

  // Hàm này dùng để bình luận
  // const handlerComment = () => {
  //   if (idUser === "") {
  //     alertify.set("notifier", "position", "bottom-left");
  //     alertify.error("Vui Lòng Kiểm Tra Đăng Nhập!");
  //     return;
  //   }

  //   const fetchSendComment = async () => {
  //     const params = {
  //       idProduct: id,
  //       idUser: localStorage.getItem("id_user"),
  //       fullname: localStorage.getItem("name_user"),
  //       content: comment,
  //       star: star,
  //     };

  //     const query = "?" + queryString.stringify(params);

  //     const response = await CommentAPI.postCommentProduct(query);
  //     console.log(response);

  //     set_load_comment(true);
  //   };

  //   fetchSendComment();

  //   setComment("");
  // };

  // Hàm này dùng để load lại dữ liệu comment
  // Phụ thuộc vào state load_comment
  // useEffect(() => {
  //   if (load_comment) {
  //     const fetchData = async () => {
  //       const params = {
  //         idProduct: id,
  //       };

  //       const query = "?" + queryString.stringify(params);

  //       const response = await CommentAPI.getCommentProduct(query);
  //       console.log(response);

  //       set_list_comment(response);
  //     };

  //     fetchData();

  //     set_load_comment(false);
  //   }
  // }, [load_comment]);

  //Hàm này gọi API và cắt chỉ lấy 4 sản phẩm

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProduct();
      // console.log(response);
      setProduct(response);
    };

    fetchData();
  }, []);

  //Phần này là để thay đổi số lượng khi mua sản phẩm
  const [quantity, setQuantity] = useState(1);
  const onChangeText = (e) => {
    setQuantity(e.target.value);
  };

  //Tăng lên 1 đơn vị
  const addQuantity = () => {
    const value = parseInt(quantity) + 1;
    setQuantity(value);
  };

  //Giảm 1 đơn vị
  const minusQuantity = () => {
    const value = parseInt(quantity) - 1;
    if (value === 0) return;
    setQuantity(value);
  };

  //Hàm này để lấy dữ liệu chi tiết sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await getProductDetail(id);
      // console.log(response);
      setDetail(response);
    };

    fetchData();
  }, [id]);

  //Phần này dùng để xem review hay description
  const [review, setReview] = useState("description");
  const handlerReview = (value) => {
    setReview(value);
  };

  //Hàm này là Thêm Sản Phẩm
  const handleAddToCart = async () => {
    if (cookie == undefined) {
      navigate("/signin");
    } else {
      const addData = {
        selectedItem: {
          productId: detail._id,
          price: detail.price,
          quantity: quantity,
        },
        userId: userId,
      };
      await addToCart(addData);
      navigate("/cart");
    }

    // alertify.set("notifier", "position", "bottom-left");
    // alertify.success("Bạn Đã Thêm Hàng Thành Công!");
  };

  return (
    <section className="py-5">
      <div className="container">
        {/* PRODUCT IMAGE AND DETAIL - START */}
        <div className="row mb-5">
          {/* CAROUSEL - START */}
          <div className="col-lg-6">
            <div className="row m-sm-0">
              {/* image list - start */}
              <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                <div
                  className="owl-thumbs d-flex flex-row flex-sm-column"
                  data-slider-id="1"
                >
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img1} alt="..." />
                  </div>
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img2} alt="..." />
                  </div>
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img3} alt="..." />
                  </div>
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img4} alt="..." />
                  </div>
                </div>
              </div>
              {/* image list - end */}

              {/* carousel and control button - start */}
              <div
                id="carouselExampleControls"
                className="carousel slide col-sm-10 order-1 order-sm-2"
                data-ride="carousel"
              >
                <div className="carousel-inner owl-carousel product-slider">
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      src={detail.img1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src={detail.img2}
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src={detail.img3}
                      alt="Third slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src={detail.img4}
                      alt="Third slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
              {/* carousel and control button - end */}
            </div>
          </div>
          {/* CAROUSEL - END */}

          {/* PRODUCT DETAIL - START */}
          <div className="col-lg-6">
            <br></br>
            <h1>{detail.name}</h1>
            <br></br>
            <p className="text-muted lead">{convertMoney(detail.price)} VND</p>
            <br></br>
            <p className="text-small mb-4">{detail.short_desc}</p>
            <ul className="list-unstyled small d-inline-block">
              <li className="mb-3 bg-white text-muted">
                <strong className="text-uppercase text-dark">Category:</strong>
                <a className="reset-anchor ml-2">{detail.categorys}</a>
              </li>
            </ul>
            <div className="row align-items-stretch mb-4">
              <div className="col-sm-5 pr-sm-0">
                <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                  <span className="small text-uppercase text-gray mr-4 no-select">
                    Quantity
                  </span>
                  <div className="quantity">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fas fa-caret-left"
                        onClick={minusQuantity}
                      ></i>
                    </button>
                    <input
                      className="form-control border-0 shadow-0 p-0"
                      type="text"
                      value={quantity}
                      onChange={onChangeText}
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fas fa-caret-right"
                        onClick={addQuantity}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 pl-sm-0">
                <a
                  className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white"
                  onClick={() => handleAddToCart()}
                >
                  Add to cart
                </a>
              </div>
              <br></br>
              <br></br>
            </div>
          </div>
          {/* PRODUCT DETAIL - END */}
        </div>
        {/* PRODUCT IMAGE AND DETAIL - END */}

        {/* COMMENT FORM - START */}
        {/* <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Comment:</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={onChangeComment}
            value={comment}
          ></textarea>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex w-25">
            <span className="mt-2">Evaluate: </span>
            &nbsp; &nbsp;
            <input
              className="form-control w-25"
              type="number"
              min="1"
              max="5"
              value={star}
              onChange={onChangeStar}
            />
            &nbsp; &nbsp;
            <span className="mt-2">Star</span>
          </div>
          <div>
            <a
              className="btn btn-dark btn-sm btn-block px-0 text-white"
              style={{ width: "12rem" }}
              onClick={handlerComment}
            >
              Send
            </a>
          </div>
        </div> */}
        {/* COMMENT FORM - END */}

        <br />

        {/* DESCRIPTION AND COMMENT - START */}
        <ul className="nav nav-tabs border-0">
          <li className="nav-item">
            <a
              className="nav-link fix_comment"
              onClick={() => handlerReview("description")}
              style={
                review === "description"
                  ? { backgroundColor: "#383838", color: "#ffffff" }
                  : { color: "#383838" }
              }
            >
              Description
            </a>
          </li>
          {/* <li className="nav-item">
            <a
              className="nav-link fix_comment"
              onClick={() => handlerReview("review")}
              style={
                review === "review"
                  ? { backgroundColor: "#383838", color: "#ffffff" }
                  : { color: "#383838" }
              }
            >
              Reviews
            </a>
          </li> */}
        </ul>
        <div className="tab-content mb-5">
          {review === "description" ? (
            <div className="tab-pane fade show active">
              <div className="pt-4 pb-4 bg-white">
                <h6 className="text-uppercase">Product description </h6>
                <br></br>
                <p
                  className="text-muted text-small mb-0"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {detail.long_desc}
                </p>
              </div>
            </div>
          ) : (
            <></>
            // <div className="tab-pane fade show active">
            //   <div className="p-4 p-lg-5 bg-white">
            //     <div className="row">
            //       <div className="col-lg-8">
            //         {list_comment &&
            //           list_comment.map((value) => (
            //             <div className="media mb-3" key={value._id}>
            //               <img
            //                 className="rounded-circle"
            //                 src="https://img.icons8.com/color/36/000000/administrator-male.png"
            //                 alt=""
            //                 width="50"
            //               />
            //               <div className="media-body ml-3">
            //                 <h6 className="mb-0 text-uppercase">
            //                   {value.fullname}
            //                 </h6>
            //                 <p className="small text-muted mb-0 text-uppercase">
            //                   dd/mm/yyyy
            //                 </p>
            //                 <ul className="list-inline mb-1 text-xs">
            //                   <li className="list-inline-item m-0">
            //                     <i className={value.star1}></i>
            //                   </li>
            //                   <li className="list-inline-item m-0">
            //                     <i className={value.star2}></i>
            //                   </li>
            //                   <li className="list-inline-item m-0">
            //                     <i className={value.star3}></i>
            //                   </li>
            //                   <li className="list-inline-item m-0">
            //                     <i className={value.star4}></i>
            //                   </li>
            //                   <li className="list-inline-item m-0">
            //                     <i className={value.star5}></i>
            //                   </li>
            //                 </ul>
            //                 <p className="text-small mb-0 text-muted">
            //                   {value.content}
            //                 </p>
            //               </div>
            //             </div>
            //           ))}
            //       </div>
            //     </div>
            //   </div>
            // </div>
          )}
        </div>
        {/* DESCRIPTION AND COMMENT - END */}

        {/* RELATED PRODUCTS - START */}
        <h2 className="h5 text-uppercase mb-4">Related products</h2>
        <div className="row">
          {product &&
            product
              .filter(
                (el) => el.category === detail.category && el._id !== detail._id
              )
              .map((value) => (
                <div className="col-lg-3 col-sm-6" key={value._id}>
                  <div className="product text-center skel-loader">
                    <div className="d-block mb-3 position-relative">
                      <img
                        className="img-fluid w-100"
                        src={value.img1}
                        alt="..."
                      />
                      <div className="product-overlay">
                        <ul className="mb-0 list-inline"></ul>
                      </div>
                    </div>
                    <h6>
                      <Link
                        className="reset-anchor"
                        to={`/detail/${value._id}`}
                      >
                        {value.name}
                      </Link>
                    </h6>
                    <p className="small text-muted">
                      {convertMoney(value.price)} VND
                    </p>
                  </div>
                </div>
              ))}
        </div>
        {/* RELATED PRODUCTS - END */}
      </div>
    </section>
  );
}

export default Detail;
