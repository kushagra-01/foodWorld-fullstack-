import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import {
  CButton,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownToggle,
  CForm,
  CFormInput,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";

import axios from "axios";
import { Productid } from "../redux/HomeAction";
export const Product = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const [size, setsize] = useState(1);
  const [visible, setVisible] = useState(false);
  let {name}  = useParams();
  console.log(name,"id")

  let product;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Productid(name));
  }, []);
  product = useSelector((state) => state.Foodworld.food[0]);
  console.log(product,"pd")

  const handlepost = () => {
    let payload = {
      name: product.name,
      price: product.price,
      image: product.img_url,
      size: size,
    };

    axios.post("https://food-011.herokuapp.com/cart", payload).then(() => {
      alert("added");
      window.location.href="/cart"
    });
  };

  return (
    <>
      <CNavbar expand="lg" colorScheme="dark" className="bg-primary">
        <CContainer fluid>
          {/* <CNavbarBrand></CNavbarBrand> */}
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink
                  active
                  onClick={() => {
                    window.location.href="/"
                  }}
                >
                  Home
                </CNavLink>
              </CNavItem>

              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Features</CDropdownToggle>
              </CDropdown>
            </CNavbarNav>
            <CForm className="d-flex">
              <CButton type="submit" color="light" variant="outline">
                Search
              </CButton>
            </CForm>
          </CCollapse>
          <CNavbarBrand onClick={(()=>{navigate("/cart")})}>Cart</CNavbarBrand>
          <CNavbarBrand  onClick={() => {
                    window.location.href="/login"
                  }}>LOGIN</CNavbarBrand>
          <CNavbarBrand  onClick={() => {
                    window.location.href="/register"
                  }}>SIGNUP</CNavbarBrand>
        </CContainer>
      </CNavbar>
      {product &&  (
        <div className="maindiv">
          <div>
            <img src={product.img_url} style={{ width: "100%" }}></img>
          </div>
          <div>
            <h3>{product.veg}</h3>
            <br/>
            <h1>{`${product.name} * ${size}`}</h1>
            <br/>
            <h2>{product.category}</h2>
            <br/>
            <h2>Base ₹{product.price}/-</h2>
            <br/>
            <h2>Total₹{product.price*size}/-</h2>
            <br/>
            <p>
              food, substance consisting essentially of protein, carbohydrate,
              fat, and other nutrients used in the body of an organism to
              sustain growth and vital processes and to furnish energy. The
              absorption and utilization of food by the body is fundamental to
              nutrition and is facilitated by digestion.
            </p>
            <p>{`Verified : ${product.best_seller}`}</p>
            <div className="sizeselect" style={{display: 'flex'}}>
              <button style={{border: '1px solid white',marginRight:"15%"}} 
                onClick={() => {
                  setsize(size + 1);
                }}
              >
                +1(Quantity)
              </button>
              <button style={{border: '1px solid white'}}
                onClick={() => {
                  if (size > 1) {
                    setsize(size - 1);
                  }
                  else{
                    alert("Cant go to minus")
                  }
                }}
              >
                -1(Quantity)
              </button >
            </div>
            <br />
            <button onClick={() => handlepost()} className="addcart">
              ADD CART
            </button>
          </div>
        </div>
      )}
    </>
  );
};
