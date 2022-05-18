import { useEffect, useState } from "react";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import { Data, err, Food } from "../redux/HomeAction";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";
import {
  CButton,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
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

export const Home = () => {


  useEffect(() => {
    dispatch(Food());
    Get()
  }, []);


  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [data, setdata] = useState([]);
  const Navigate = useNavigate();

  const handleSearch = (e) => {
    Get()
    const filteredContacts =
      e.length === 0
        ? data
        : data.filter((contact) =>
            contact.name.toLowerCase().includes(e.toLowerCase())
          );
    dispatch(Data(filteredContacts));
  };

  const Low = () => {
    const sort = data.sort((a, b) => {
      return a.price - b.price;
    });
    dispatch(Data(sort));
  };
  const Top = () => {
    const sort = data.sort((a, b) => {
      return b.price - a.price;
    });
    dispatch(Data(sort));
  };
  const Non = () => {
    Get()
    const sort = data.filter((contact) =>
    contact.veg!=="Vegiterian"
  );
    dispatch(Data(sort));
  };
  const Veg = () => {
    Get()
    const sort = data.filter((contact) =>
    contact.veg=="Vegiterian"
  );
    dispatch(Data(sort));
  };
  const ver = () => {
    axios
      .get(`https://food-011.herokuapp.com/best_seller`)
      .then(({ data }) => {
        dispatch(Data(data));
      })
      .catch((e) => {
        dispatch(err(e));
      });
  };
  const Notver = () => {
    axios
      .get(`https://food-011.herokuapp.com/Notbest_seller`)
      .then(({ data }) => {
        dispatch(Data(data));
      })
      .catch((e) => {
        dispatch(err(e));
      });
  };


  const Get=()=>{
    axios
    .get(`https://food-011.herokuapp.com`)
    .then(({ data }) => {
      setdata(data)
    })
    .catch((e) => {
      dispatch(err(e));
    });
  }
  let food = useSelector((store) => store.Foodworld.food[0]);

  console.log(food);
  return (
    <>
      <marquee
        behavior=""
        direction=""
        style={{
          backgroundColor: "black",
          height: "40px",
        }}
      >
        <div>
          <p
            style={{
              color: "white",
              fontSize: "15px",
            }}
          >
            **Use Code Masai69 to get 100% Off**
          </p>
        </div>
      </marquee>
      <CNavbar expand="lg" colorScheme="dark" className="bg-primary">
        <CContainer fluid>
          {/* <CNavbarBrand></CNavbarBrand> */}
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse">
            <CNavbarNav>
              <CNavItem>
                <CNavLink active>Home</CNavLink>
              </CNavItem>

              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle>Features</CDropdownToggle>
                <CDropdownMenu style={{ backgroundColor: "white" }}>
                  <CDropdownItem
                    onClick={Non}
                    style={{ backgroundColor: "white" }}
                  >
                    Non-Vegiterian
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={Veg}
                    style={{ backgroundColor: "white" }}
                  >
                    Vegiterian
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={Top}
                    style={{ backgroundColor: "white" }}
                  >
                    Price Top to Low
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={Low}
                    style={{ backgroundColor: "white" }}
                  >
                    Price Low to Top
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={ver}
                    style={{ backgroundColor: "white" }}
                  >
                    Verified
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={Notver}
                    style={{ backgroundColor: "white" }}
                  >
                    Not-Verified
                  </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem style={{ backgroundColor: "white" }}>
                    Something else here
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
            <CForm className="d-flex">
              <CFormInput
                type="search"
                className="me-2"
                placeholder="Search"
                onInput={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              <CButton type="submit" color="light" variant="outline">
                Search
              </CButton>
            </CForm>
          </CCollapse>
          <CNavbarBrand
            onClick={() => {
              Navigate("/cart");
            }}
          >
            Cart
          </CNavbarBrand>
          <CNavbarBrand
            onClick={() => {
              Navigate("/login");
            }}
          >
            LOGIN
          </CNavbarBrand>
          <CNavbarBrand
            onClick={() => {
              Navigate("/register");
            }}
          >
            SIGNUP
          </CNavbarBrand>
        </CContainer>
      </CNavbar>
      <br /> <br />
      {/* // navbar */}
      <Row xs={1} md={3} className="g-4">
        {console.log(food, "mapdown")}
        {food &&
          food.map((idx) => (
            <Link to={`/${idx._id}`}>
              <Col>
                <Card>
                  <Card.Img
                    variant="top"
                    src={idx.img_url}
                    style={{ width: "60%", height: "20%", margin: "auto" }}
                  />
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "15px",
                      }}
                    >
                      <Card.Title>{idx.name}</Card.Title>
                      <Card.Title> {`Only at ₹ ${idx.price}`}</Card.Title>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "15px",
                      }}
                    >
                      <Card.Text>{`Verified ${idx.best_seller}`}</Card.Text>

                      <Card.Text>{idx.veg}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
          ))}
      </Row>
    </>
  );
};
