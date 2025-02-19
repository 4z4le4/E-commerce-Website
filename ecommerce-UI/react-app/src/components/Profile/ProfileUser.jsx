import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { setError, setMessage } from "../../redux/actions/commonAction";
import { updateUser, setUser } from "../../redux/actions/userAction";
import { getCartsByIdUser } from "../../redux/actions/cartAction";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
// import "./Register.css";
class ProfileUser extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: "",
        userName: "",
        password: "",
        email: "",
        phoneNumber: "",
      },
    };
  }

  registNewUser = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const phoneNumber = event.target.elements.phoneNumber.value;

    if (name === "") {
      this.props.setError("Name is required!");
      return;
    }

    if (phoneNumber.length !== 10 || phoneNumber < 0 || isNaN(phoneNumber)) {
      this.props.setError("Phone number is invalid!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      this.props.setError("Email is required!");
      return;
    }
    if (!emailRegex.test(email)) {
      this.props.setError("Invalid email address!");
      return;
    }

    const { error } = this.props;

    if (error === "") {
      const { user } = this.state;
      user.name = name;
      user.password = this.props.user.password;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.type = this.props.user.type;
      user.userName = this.props.user.userName;
      this.props.updateUser(this.props.user.id, user);
    }
  };
  renderErrorMessage = () => {
    const { error } = this.props;
    if (error) {
      return (
        <ModalShowError
          content={error}
          heading="Something is wrong!"
        ></ModalShowError>
      );
    }
    return <></>;
  };
  renderMessage = () => {
    const { message } = this.props;
    if (message) {
      return (
        <ModalShowMessage
          content={message}
          heading="Successfull!"
        ></ModalShowMessage>
      );
    }
    return <></>;
  };
  render() {
    let { user } = this.props;
    const { navigate } = this.props.router;
    return (
      <div className="login-page register-page">
        <Form onSubmit={this.registNewUser} className="px-3 form-login">
          <h1>Profile</h1>
          {this.renderErrorMessage()}
          {this.renderMessage()}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              defaultValue={user.name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              defaultValue={user.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone contact</Form.Label>
            <Form.Control
              type="number"
              placeholder="Phone contact"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-end">
            <div>
              <p
                className="sign-up"
                onClick={() => {
                  navigate("/changePassword");
                }}
              >
                Change password
              </p>
              <button type="submit" style={{ marginRight: "20px" }}>
                Update
              </button>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.commonReducer.error,
  user: state.userReducer.user,

  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  setError,
  updateUser,
  setMessage,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileUser)
);
