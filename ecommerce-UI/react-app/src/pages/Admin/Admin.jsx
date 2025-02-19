import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import { clearStateUser } from "../../redux/actions/userAction";
import { Outlet } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { setUser } from "../../redux/actions/userAction";
class Admin extends Component {
  renderProfile = () => {
    const { navigate } = this.props.router;
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      return <></>;
    }
    if (user) {
      return (
        <NavDropdown
          title={user.name}
          id="basic-nav-dropdown"
          className="hover-link"
        >
          <NavDropdown.Item
            className="hover-link"
            onClick={() => {
              navigate("/profileUser");
            }}
          >
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item className="hover-link">Setting</NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              navigate("/");
            }}
            className="hover-link"
          >
            Home
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={() => {
              this.props.clearStateUser();
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
      if (userLocal.type === "User" || Object.keys(userLocal).length === 0) {
        const { navigate } = this.props.router;
        navigate("/");
      }
    }
  }
  renderLoginPage = () => {
    const { user } = this.props;
    const { navigate } = this.props.router;
    if (Object.keys(user).length === 0) {
      return (
        <Nav.Link
          onClick={() => {
            this.props.clearStateUser();
            navigate("/login");
          }}
          className="hover-link"
        >
          Login
        </Nav.Link>
      );
    }
    return;
  };
  render() {
    const { navigate } = this.props.router;
    return (
      <div>
        <Navbar expand="lg" className=" nav-home-top" fixed="top">
          <Container>
            <Navbar.Brand
              onClick={() => {
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
                    navigate("/admin/categoryAdmin/add");
                  }}
                  className="hover-link"
                  active={location.pathname.startsWith("/admin/categoryAdmin/")}
                >
                  Category
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/productAdmin/add");
                  }}
                  className="hover-link"
                  active={location.pathname.startsWith("/admin/productAdmin/")}
                >
                  Product
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/invoice");
                  }}
                  className="hover-link"
                  active={location.pathname.startsWith("/admin/invoice")}
                >
                  Invoice
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/admin/registerAdmin");
                  }}
                  className="hover-link"
                  active={location.pathname.startsWith("/admin/registerAdmin")}
                >
                  Account
                </Nav.Link>
              </Nav>
              <Nav>
                {this.renderProfile()}
                {this.renderLoginPage()}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div style={{ marginTop: "90px" }}>
          <Outlet></Outlet>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  clearStateUser,
  setUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
