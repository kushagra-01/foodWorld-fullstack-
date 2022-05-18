import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Carts } from "../redux/HomeAction";
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

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);



  useEffect(() => {
    dispatch(Carts());
  }, []);

  let data = useSelector((store) => store.Foodworld.food[0]);
  console.log(data, "cartt");

  let sum = 0;
  let c =0
  if(data!==undefined) {
    data.map((e) => {
      sum = sum + e.price * e.size;
      c++
    });
  }
 
  let deilvery = 40;

  const handledelete = (id) => {
    console.log(id)

    axios.delete(`https://food-011.herokuapp.com/${id}`).then(() => {
      dispatch(Carts());
    });
    // data.filter((todo) => {
    //   return todo.id !== id;
    // });
   
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
                    navigate("/");
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
          <CNavbarBrand
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </CNavbarBrand>
          <CNavbarBrand>LOGIN</CNavbarBrand>
          <CNavbarBrand>SIGNUP</CNavbarBrand>
        </CContainer>
      </CNavbar>
    
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="heading">Order List</h1>
        <h1 className="heading">Shoping Cart</h1>
      </div>
      <div className="cartdiv">
        <div className="cartset">
          {data===undefined?<h1>loading</h1>:
          
          data.map((e) => {
            return (
              <div className="single" key={e.id}>
                <div className="cartimg">
                  <img src={e.image}></img>
                </div>
                <div
                  className="cartdetails"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    {" "}
                    <h2>{e.name}</h2>
                     <p>Quantity {e.size}</p>
                    <p>Base Price {e.price}</p>
                     <p>Total ₹{e.price * e.size}/-`</p>
                  </div>

                  <div style={{ marginLeft: "4%" }}>
                    {" "}
                    <button
                      style={{ border: "1px solid white" }}
                      onClick={() => {
                        handledelete(e._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h2 className="total">Total Products:{c}pcs</h2>
          <span style={{ fontSize: "22px", fontWeight: "500" }}>Subtotal:</span>
          <span className="subtotal">₹{sum}/-</span>
          <br></br>
          <span style={{ fontSize: "22px", fontWeight: "500" }}>Delivery:</span>
          <span className="subtotal">₹{deilvery}/-</span>
          <br></br>
          <span style={{ fontSize: "22px", fontWeight: "500" }}>Total:</span>
          <span className="subtotal">₹{sum + deilvery}/-</span>
          <br></br>
          <button
            onClick={() => {
              navigate(`/checkout`);
            }}
            style={{
              width: "80%",
              height: "70px",
              fontSize: "20px",
              border: "1px solid white",
            }}
          >
            Checkout
          </button>
        </div>
        </div>
    </>
  );
};
