import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { Button, Table } from "react-bootstrap";
import {
  insertCart,
  getCartsByIdUser,
  deleteByProductId,
  deleteByUserId,
} from "../../redux/actions/cartAction";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
import "./Cart.css";
class Cart extends Component {
  decProduct = async (idProduct, quantity) => {
    if (quantity <= 1) {
      return;
    }
    const { user } = this.props;
    let cart = {
      userId: user.id,
      productId: idProduct,
      quantity: -1,
    };
    try {
      await this.props.insertCart(cart);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  };
  incProduct = async (idProduct,quantity,productQuantity) => {
    if(quantity >= productQuantity){
      return;
    }
    const { user } = this.props;
    let cart = {
      userId: user.id,
      productId: idProduct,
      quantity: 1,
    };
    try {
      await this.props.insertCart(cart);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
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
  removeProduct = async (id) => {
    const { user } = this.props;
    try {
      await this.props.deleteByProductId(id);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  };
  clearAll = async () => {
    const { user } = this.props;
    try {
      await this.props.deleteByUserId(user.id);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  };
  renderCart = (carts) => {
    if (carts.length > 0) {
      return (
        <>
          <div style={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table striped bordered className="carts">
              <thead>
                <tr>
                  <th></th>
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
                    <td>
                      <button
                        className="rm-product"
                        onClick={() => {
                          this.removeProduct(cart.id);
                        }}
                      >
                        x
                      </button>
                    </td>
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
                    <td>
                      <button
                        className="dcr-mount"
                        onClick={() => {
                          this.decProduct(cart.productDto.id, cart.quantity);
                        }}
                        style={{
                          color: "red",
                          fontWeight: "700",
                          fontSize: "20px",
                          backgroundColor: "transparent",
                          border: "none",
                          transition: ".5s",
                        }}
                      >
                        -
                      </button>{" "}
                      {cart.quantity}
                      <button
                        className="inc-mount"
                        onClick={() => {
                          this.incProduct(cart.productDto.id,cart.quantity,cart.productDto.quantity);
                        }}
                        style={{
                          color: "green",
                          fontWeight: "700",
                          fontSize: "20px",
                          backgroundColor: "transparent",
                          border: "none",
                          transition: ".5s",
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td style={{ color: "#670000", fontWeight: "700" }}>
                      {cart.productDto.price * cart.quantity}$
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div
            className="d-flex justify-content-lg-end"
           
          >
            <button
              className="clear-carts"
              onClick={() => {
                this.clearAll();
              }}
            >
              Clear All
            </button>
            <button
              className="check-out"
              onClick={() => {
                const { navigate } = this.props.router;
                navigate("/orderInfo");
              }}
            >
              Check out
            </button>
          </div>
        </>
      );
    }
    return <div className="notification">Add some product!</div>;
  };
  render() {
    const { carts } = this.props;
    return (
      <div className="container p-3">
        <div className="carts-layout">
          {this.renderErrorMessage()}
          {this.renderMessage()}
          {this.renderCart(carts)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  carts: state.cartReducer.carts,
  message: state.commonReducer.message,
  error: state.commonReducer.error,
});
const mapDispatchToProps = {
  insertCart,
  getCartsByIdUser,
  deleteByProductId,
  deleteByUserId,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
