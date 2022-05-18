import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { Navigate, useNavigate, useParams } from "react-router";

export default function SignUpp() {
  const [form, setform] = useState({});
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const Postdata = (e) => {
    e.preventDefault();
    axios
      .post("https://food-011.herokuapp.com/register", form)
      .then((res) => {
        console.log(res.data, "post");

        if (res.data.token) {
            alert("LOGIN succeded");
          window.location.href = "/";
        } else {
          alert("TRY ANOTHER");
        }
      })
      .catch((e) => {
        console.log(e.message);
      })
      
  };

  const Handledata = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setform({ ...form, [id]: value });
    console.log(form, "bhh");
  };

  return (
    <>
      {" "}
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
                    window.location.href = "/";
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
          <CNavbarBrand
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            LOGIN
          </CNavbarBrand>
          <CNavbarBrand
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            SIGNUP
          </CNavbarBrand>
        </CContainer>
      </CNavbar>
      <form>
        <h3>Register</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="First name"
            onChange={(e) => {
              Handledata(e);
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            placeholder="Last name"
            onChange={(e) => {
              Handledata(e);
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e) => {
              Handledata(e);
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            onChange={(e) => {
              Handledata(e);
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark btn-lg btn-block"
          onClick={(e) => {
            Postdata(e);
          }}
        >
          Register
        </button>
        <p
          className="forgot-password text-center"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Already registered
        </p>
      </form>
    </>
  );
}
