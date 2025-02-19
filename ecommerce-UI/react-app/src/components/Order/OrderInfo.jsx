import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import { setError, setMessage } from "../../redux/actions/commonAction";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import {
  insertOrder,
  insertOrderInfo,
} from "../../redux/actions/paymentAction";
import { LocalDate, DateTimeFormatter } from "js-joda";
import { deleteByUserId } from "../../redux/actions/cartAction";
import "./OrderInfo.css";
class OrderInfo extends Component {
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
  purchase = async (event) => {
    event.preventDefault();
    try {
      const address = event.target.elements.address.value;
      const phoneContact = event.target.elements.phoneContact.value;
      if(address === ""){
        this.props.setError("Address is required!")
        return;
      }
      if (phoneContact.length !== 10 || phoneContact < 0 || isNaN(phoneContact)) {
        this.props.setError("Phone number is invalid!");
        return;
      }
      const { user, carts } = this.props;
      let date = new Date();
      let jsonDate = JSON.stringify(date.toISOString().substring(0, 10));
      let formatter = DateTimeFormatter.ofPattern('"yyyy-MM-dd"');
      let localDate = LocalDate.parse(jsonDate, formatter);
      let idsCart = [];
      carts.forEach((element) => {
        idsCart.push(element.id);
      });
      
      const total = event.target.elements.total.value;

      let orderInfoPass = {
        userId: user.id,
        phoneContact: phoneContact,
        status: "InProgress",
        total: total,
        address: address,
        date: localDate,
      };
      await this.props.insertOrderInfo(orderInfoPass);
      // await new Promise((resolve) => setTimeout(resolve, 100));
      await this.props.insertOrder(idsCart);
      await this.props.deleteByUserId(user.id);
      this.props.setMessage("Purchase completed!");
      const { navigate } = this.props.router;
      navigate("/history");
    } catch (error) {}
  };
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    this.updateTotal();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.carts !== this.props.carts) {
      this.updateTotal();
    }
  }

  updateTotal = () => {
    const { carts } = this.props;
    let total = 0;
    if (carts) {
      carts.forEach((element) => {
        total += element.productDto.price * element.quantity;
      });
    }
    this.setState({ total });
  };
  render() {
    const { navigate } = this.props.router;
    const { carts } = this.props;
    const { total } = this.state;

    return (
      <div
        className="order-layout"
        style={{ marginTop: "130px", marginBottom: "20px" }}
      >
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <div>
          <Form onSubmit={this.purchase} className="px-3 orderinfo-form">
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address" name="address" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Phone contact"
                name="phoneContact"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total($)</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                name="total"
                readOnly
                value={total}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  id="cod"
                  label="COD"
                  name="paymentMethod"
                  checked
                />
                <Form.Check
                  type="radio"
                  id="paypal"
                  label="PayPal"
                  name="paymentMethod"
                  disabled
                />
                <Form.Check
                  type="radio"
                  id="credit-card"
                  label="Credit Card"
                  name="paymentMethod"
                  disabled
                />
              </div>
            </Form.Group>
            <Form.Group>
              <div style={{ maxHeight: "400px", overflow: "auto" }}>
                <Table striped bordered className="carts">
                  <thead>
                    <tr>
                      <th hidden>#</th>
                      <th hidden>id product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((cart, index) => (
                      <tr key={cart.id}>
                        <td hidden>{cart.id}</td>
                        <td hidden>{cart.productDto.id}</td>
                        <td>{cart.productDto.name}</td>
                        <td style={{ color: "#670000", fontWeight: "700" }}>
                          {cart.productDto.price}$
                        </td>
                        <td>
                          <img
                            src={`data:image/jpeg;base64,${cart.productDto.image}`}
                            alt={cart.productDto.name}
                            width="100"
                          />
                        </td>
                        <td>{cart.quantity}</td>
                        <td style={{ color: "#670000", fontWeight: "700" }}>
                          {cart.productDto.price * cart.quantity}$
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <div className="d-flex justify-content-lg-end">
                <button type="submit" className="check-out">
                  Purchase
                </button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  user: state.userReducer.user,
  carts: state.cartReducer.carts,
});

const mapDispatchToProps = {
  setError,
  insertOrder,
  insertOrderInfo,
  deleteByUserId,
  setMessage,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderInfo)
);
