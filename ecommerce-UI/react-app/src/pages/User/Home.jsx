import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { clearStateUser, setUser } from "../../redux/actions/userAction";
import { NavDropdown } from "react-bootstrap";
import {
  getCartsByIdUser,
  clearStateCart,
} from "../../redux/actions/cartAction";
import "./Home.css";
import HomeBody from "./HomeBody";
import Footer from "./Footer";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      showBody: true,
    };
  }

  async componentDidMount() {
    const userLocal = JSON.parse(localStorage.getItem("user")); // retrieve user state from localStorage
    if (userLocal !== null && userLocal !== undefined) {
      const { user } = this.props;
      if (Object.keys(user).length === 0) {
        try {
          await Promise.all([this.props.setUser(userLocal)]);
        } catch (error) {
          console.log(error);
        } // update Redux store with saved user state
      }
    }
    const { carts } = this.props;
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      return;
    } else {
      try {
        await Promise.all([this.props.getCartsByIdUser(user.id)]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  renderProfile = () => {
    const { navigate } = this.props.router;
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      return <></>;
    }
    if (user) {
      return (
        <NavDropdown
          className="px-3 hover-link"
          title={user.name}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item className="hover-link"  onClick={() => {
              this.setState({ showBody: false });
              navigate("/profileUser");
            }}>Profile</NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              this.setState({ showBody: false });
              navigate("/history");
            }}
            className="hover-link"
          >
            Shopping history
          </NavDropdown.Item>
          <NavDropdown.Item className="hover-link">
            Your payment
          </NavDropdown.Item>
          <NavDropdown.Item className=" hover-link">Setting</NavDropdown.Item>
          <NavDropdown.Item className=" hover-link" disabled={user.type==="User" ? true : false} onClick={()=>{
            navigate("/admin/categoryAdmin/add")
          }}>Dashboard</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={() => {
              this.props.clearStateUser();
              this.props.clearStateCart();
              navigate("/login");
            }}
            className="hover-link"
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  };
  renderLoginPage = () => {
    const { user } = this.props;
    const { navigate } = this.props.router;
    if (Object.keys(user).length === 0) {
      return (
        <Nav.Link
          onClick={() => {
            this.props.clearStateUser();
            this.props.clearStateCart();
            navigate("/login");
          }}
          className="px-3 hover-link"
        >
          Login
        </Nav.Link>
      );
    }
    return;
  };
  toggleShowBody = (newValue) => {
    this.setState({ showBody: newValue });
  };
  render() {
    let { navigate } = this.props.router;
    let { user } = this.props;
    return (
      <div>
        <Navbar expand="lg" className="nav-home-top" fixed="top">
          <Container>
            <Navbar.Brand
              onClick={() => {
                this.setState({ showBody: true });
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              <img
                src="../../../logo.png.webp"
                alt="logo"
                className="logo-custom"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  onClick={() => {
                    this.setState({ showBody: true });
                    navigate("/");
                  }}
                  className="px-3 hover-link"
                  active={location.pathname === "/"}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    this.setState({ showBody: false });
                    navigate("/product");
                  }}
                  className="px-3 hover-link"
                  active={location.pathname.startsWith("/product")}
                >
                  Product
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    this.setState({ showBody: false });
                    navigate("/about");
                  }}
                  className="px-3 hover-link"
                  active={location.pathname.startsWith("/about")}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    this.setState({ showBody: false });
                    navigate("/contact");
                  }}
                  className="px-3 hover-link"
                  active={location.pathname.startsWith("/contact")}
                >
                  Contact
                </Nav.Link>
              </Nav>
              <Nav>
                {this.renderProfile()}
                {this.renderLoginPage()}
              </Nav>
            </Navbar.Collapse>
            <Nav.Link
              onClick={() => {
                if (Object.keys(user).length === 0) {
                  navigate("/login");
                } else {
                  this.setState({ showBody: false });
                  navigate("/cart");
                }
              }}
              className="px-3 hover-link cart"
              active={location.pathname === "/cart"}
            >
              <img src="../../../card.svg" alt="cart" />
              <span className="count-cart">{this.props.count}</span>
            </Nav.Link>
          </Container>
        </Navbar>
        <div className="content-outlet" style={{ marginTop: "95px" }}>
          {this.state.showBody && location.pathname === "/" ? (
            <HomeBody toggleShowBody={this.toggleShowBody}></HomeBody>
          ) : (
            <Outlet></Outlet>
          )}
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  carts: state.cartReducer.carts,
  count: state.cartReducer.count,
});

const mapDispatchToProps = {
  clearStateUser,
  getCartsByIdUser,
  clearStateCart,
  setUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
