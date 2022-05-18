import { Route, Routes } from "react-router";
import FooterPage from "./components/footer";
import { Home } from "./components/home";
import { Product } from "./components/ProductPage";
import { Cart } from "./components/cart";
import "./App.css";
import { Checkout } from "./components/Checkout";
import { Payment } from "./components/Payment";

import Loginnn from "./components/login";
import SignUpp from "./components/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:name" element={<Product />}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/payment" element={<Payment/>}></Route>
        <Route path="/login" element={<Loginnn/>}></Route>
        <Route path="/register" element={<SignUpp/>}></Route>
      </Routes>
      <FooterPage />
    </div>
  );
}

export default App;
