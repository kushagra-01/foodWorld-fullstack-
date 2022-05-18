import { useParams } from "react-router"
import { Cart } from "./cart"
import axios from "axios";
import { useEffect, useState } from "react"
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
export const Checkout = () =>{
    const [mobile,setmobile]=useState("")
    const [visible, setVisible] = useState(false);
    const [name,setname]=useState("")
    const [state,setstate]=useState("")
    const [address,setaddress]=useState("")
    const [pin,setpin]=useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
 
    useEffect(()=>{
       getdata()
    },[])
    const getdata=()=>{
        dispatch(Carts());
    
    }
   let data = useSelector((store) => store.Foodworld.food[0]);
     let sum=0;
     if(data){
    data.map((e)=>{
        sum=sum+ e.price * e.size
    })}
    let GST=Math.round(sum*0.18);
    

    const handlesub=()=>{
  
     if(name.length===0 || state.length===0 || address.length===0 || pin.length!==6 || mobile.length!==10){
       alert("Invalid Details")
     }
     else{
         navigate('/payment')
     }
    }
    let Delivery=50
    return(
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
          <CNavbarBrand  onClick={() => {
                    window.location.href="/login"
                  }}>LOGIN</CNavbarBrand>
          <CNavbarBrand  onClick={() => {
                    window.location.href="/register"
                  }}>SIGNUP</CNavbarBrand>
        </CContainer>
      </CNavbar>
      <br/>
      <br/>
     
        <h1 className="heading">Checkout Page</h1>
         <div className="checkmain">
          <div className="formdiv">
          <label>Full Name*</label><br></br>
          <input onChange={(e)=>setname(e.target.value)} type="text" placeholder="Enter Your Name"></input><br></br>
          <label>State*</label><br></br>
          <input onChange={(e)=>setstate(e.target.value)} type="text" placeholder="Enter Your State"></input><br></br>
          <label>Address Line 1*</label><br></br>
          <input onChange={(e)=>setaddress(e.target.value)}  type="text" placeholder="Enter Your Address Line 1"></input><br></br>
          <label>Address Line 2</label><br></br>
          <input type="text" placeholder="Enter Your Address Line 2"></input><br></br>
          <label>Mobile*</label><br></br>
          <input onChange={(e)=>setmobile(e.target.value)} type="text" placeholder="Enter 10 Digit Valid Mobile Number "></input><br></br>
          <label>Pincode*</label><br></br>

          <input onChange={(e)=>setpin(e.target.value)} type="text" placeholder="Enter Pincode"></input><br></br>
          
          </div>
         <div className="ordersum">
          <h1>Order Summary</h1>
          <p>Details</p>
          {data && data.map((e)=><div key={e.id}>
          <p>{e.name}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  ₹{e.price}/- * {e.size} Quantity </p>
          </div>)}
          <hr></hr>
          <p>Subtotal:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;₹{sum}/-</p>
          <p>Tax:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;₹{GST}/-</p>
          <p>Delivery:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;₹{Delivery}/-</p>
          <hr></hr>
          <h1>Total Bill</h1>
          <h1 style={{fontSize:"20px"}}>₹{sum+GST+Delivery}/-</h1>
          <button onClick={handlesub}  style={{border: '1px solid white'}}>PAYMENT</button>
           </div>
         </div>
        </>
    )
}