
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

export default function Loginnn() {

    const [form,setform]=useState({})
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const Postdata = (e)=>{
        e.preventDefault()
         axios.post("https://food-011.herokuapp.com/login",form).then((res)=>{console.log(res.data.token,"ress")
        if(res.data.token){
            alert("Login Success")
            window.location.href = "/";
        }
        else{
            alert("TRY ANOTHER")
        }
        }).catch((e)=>{console.log(e)}).catch((e)=>{console.log(e)})
    }

    const Handledata = (e)=>{
        e.preventDefault()
        const {id,value} =e.target
        setform({...form,[id]:value})
        console.log(form,"bhh")
    }
    
        return (
            <> <CNavbar expand="lg" colorScheme="dark" className="bg-primary">
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
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email"  onChange={((e)=>{Handledata(e)})} required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password"  onChange={((e)=>{Handledata(e)})} required />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg "  onClick={((e)=>{Postdata(e)})}>Loginin</button>
                <Link  to={"/register"}>
                <p type="submit" className="btn btn-dark  ">New User Want To Register?</p>
                </Link>
               
                <p className="forgot-password text-right">
                 
                </p>
            </form></>
        );
    
}