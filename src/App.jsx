import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./componets/header/Header";
import Signin from "./pages/authComponents/signin/Signin";
import Signup from "./pages/authComponents/signup/Signup";
import AddProduct from "./admin/product/AddProduct";
import GetSingleProduct from "./admin/product/single-product/GetSingleProduct";
import SignOut from "./pages/authComponents/SignOut";
import UpdatePassword from "./pages/authComponents/UpdatePassword";
import ResetPassword from "./pages/authComponents/ResetPassword";
import UpdateProduct from "./admin/product/UpdateProduct";
import Footer from "./componets/footer/Footer";
import GetByCategoryProduct from "./admin/product/GetByCategoryProduct";
import Cart from "./componets/Cart";
import Checkout from "./componets/Checkout";
import GetLimitProduct from "./admin/product/GetLimitProduct";
import AboutPage from "./pages/AboutPage";
import OrdersDashboard from "./admin/product/compoments/OrdersDashboard";
import OrderItems from "./admin/product/compoments/OrderItems";
import ContactPage from "./pages/ContactPage";
import GetAllProduct from "./admin/product/GetallProduct";
import GetAllProductByCategory from "./admin/product/GetAllProductByCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Header /> <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allproducts" element={<GetLimitProduct />} />
          <Route path="/allorders" element={<OrdersDashboard />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/admin">
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product" element={<UpdateProduct />} />
          </Route>
          <Route path="/product/:id" element={<GetSingleProduct />} />
          <Route path="/categories" element={<GetAllProductByCategory />} />
          <Route path="/categories/:id" element={<GetByCategoryProduct />} />
          <Route path="/orders/:id" element={<OrderItems />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
