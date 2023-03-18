import "./App.css";
import "./css/custom.css";
import "./css/style.default.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./Share/Footer/Footer";
import Header from "./Share/Header/Header";
import Home from "./Home/Home";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Shop from "./Shop/Shop";
import Detail from "./Detail/Detail";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import MainHistory from "./History/MainHistory";
import DetailHistory from "./History/DetailHistory";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/history" element={<MainHistory />} />
          <Route exact path="/history/:id" element={<DetailHistory />} />

          <Route exact path="/shop" element={<Shop />} />
        </Routes>
      </BrowserRouter>

      {/* <Chat /> */}

      <Footer />
    </div>
  );
}

export default App;
