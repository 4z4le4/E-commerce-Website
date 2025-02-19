import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import { getUserByUserName } from "../../redux/actions/userAction";
import { setError, setMessage } from "../../redux/actions/commonAction";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import "./Login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userName: "",
        password: "",
      },
    };
  }

  signUp = (event) => {
    event.preventDefault();
    const userName = event.target.elements.userName.value;
    const password = event.target.elements.password.value;
    if (userName.length < 6 || userName.length > 18) {
      this.props.setError("Username must be between 6 and 18 characters!");
      return;
    }
  
    if (password.length < 6 || password.length > 18) {
      this.props.setError("Password must be between 6 and 18 characters!");
      return;
    }
    let { user } = this.state;
    let { navigate } = this.props.router;
    user.userName = userName;
    user.password = password;
    this.props.getUserByUserName(user, navigate);
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
    const { message } = this.props;
    const { navigate } = this.props.router;
    return (
      <div style={{ width: "100vw" }} className="login-page">
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <img className="back-to-home logo-custom" src="../../../logo.png.webp" alt="logo" onClick={()=>{
          navigate("/")
        }} />
        <Form className="px-3 form-login" onSubmit={this.signUp}>
          <h2>Group 01</h2>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Username"
                name="userName"
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formHorizontalPassword"
          >
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-end">
            <div>
            <p
              className="sign-up"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create an account
            </p>
            <button
              className="sign-in"
              type="submit"
              style={{ marginRight: "20px" }}
            >
              Sign in
            </button>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  getUserByUserName,
  setError,
  setMessage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
