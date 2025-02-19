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
class ChangePassword extends Component {
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
    const oldPass = event.target.elements.oldPass.value;
    const password = event.target.elements.password.value;
    const passwordAgain = event.target.elements.passwordAgain.value;

    if (oldPass.length < 6 || oldPass.length > 18) {
      this.props.setError(
        "Password currently  must be between 6 and 18 characters!"
      );
      return;
    }
    if (oldPass !== this.props.user.password) {
      this.props.setError("Password currently is not correct!");
      return;
    }

    if (oldPass === password) {
      this.props.setError("New password not same password currently!");
      return;
    }

    if (password !== passwordAgain) {
      this.props.setError("Password does not match!");
      return;
    }

    if (password.length < 6 || password.length > 18) {
      this.props.setError("password must be between 6 and 18 characters!");
      return;
    }
    if (passwordAgain.length < 6 || passwordAgain.length > 18) {
      this.props.setError("password must be between 6 and 18 characters!");
      return;
    }

    if (password !== passwordAgain) {
      this.props.setError("Password does not match!");
      return;
    }

    const { error } = this.props;

    if (error === "") {
      const { user } = this.state;
      user.name = this.props.user.name;
      user.password = password;
      user.email = this.props.user.email;
      user.phoneNumber = this.props.user.phoneNumber;
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
    let { navigate } = this.props.router;
    return (
      <div className="login-page register-page">
        <Form onSubmit={this.registNewUser} className="px-3 form-login">
          <h1>Profile</h1>
          {this.renderErrorMessage()}
          {this.renderMessage()}
          <Form.Group className="mb-3">
            <Form.Label>Password currently</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password currently"
              name="oldPass"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New password"
              name="password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password again</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password again"
              name="passwordAgain"
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-end">
            <div>
              <p
                className="sign-up"
                onClick={() => {
                  navigate("/profileUser");
                }}
              >
                Profile
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
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
