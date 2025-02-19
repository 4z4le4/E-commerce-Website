import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
import {
  getAllCartsByOrderInfo,
  getAllOrderInfoByIdUser,
  clearPaymentState,
  setStatus,
} from "../../redux/actions/paymentAction";
import { setUser } from "../../redux/actions/userAction";
import { Button, Dropdown, Nav, Table } from "react-bootstrap";
import ModalShowProduct from "../../helpers/ModalShowProduct";
import "./ShoppingHistory.css"
class ShoppingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProductModal: false,
      cartsPay: [],
      selectedStatus: "InProgress",
    };
  }
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
  viewDetail = async (id) => {
    try {
      await this.props.getAllCartsByOrderInfo(id);
      const { cartsPay } = this.props;
      this.setState({ cartsPay: cartsPay, showProductModal: true });
    } catch (error) {}
  };
  componentDidMount = async () => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    try {
      await Promise.all([this.props.getAllOrderInfoByIdUser(userLocal.id)]);
    } catch (error) {
      console.log(error);
    }
  };
  componentWillUnmount = async () => {
    await this.props.clearPaymentState();
  };
  setStatus = async (orderInfo, status) => {
    try {
      let orderInfoPass = {
        id: orderInfo.id,
        userId: orderInfo.userDto.id,
        phoneContact: orderInfo.phoneContact,
        status: status,
        total: orderInfo.total,
        date: orderInfo.date,
        address: orderInfo.address,
      };
      await this.props.setStatus(orderInfoPass);
    } catch (error) {
      console.log(error);
    }
  };

  handleStatusChange = (status) => {
    this.setState({ selectedStatus: status });
  };
  render() {
    const { orderInfos, user } = this.props;
    const { cartsPay, showProductModal, selectedStatus } = this.state;

    // filter orderInfos by selected status
    const filteredOrderInfos = orderInfos.filter(
      (orderInfo) => orderInfo.status === selectedStatus
    );
    return (
      <div className="invoice" style={{marginTop:"130px",marginBottom:"30px"}}>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <Nav activeKey={selectedStatus} className="invoice-navs">
            <Nav.Item>
              <Nav.Link
                eventKey="InProgress"
                onClick={() => {
                  this.handleStatusChange("InProgress");
                }}
              >
                In Progress
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Delivering"
                onClick={() => {
                  this.handleStatusChange("Delivering");
                }}
              >
                Delivering
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Completed"
                onClick={() => {
                  this.handleStatusChange("Completed");
                }}
              >
                Completed
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Refund"
                onClick={() => {
                  this.handleStatusChange("Refund");
                }}
              >
                Refund
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Reject"
                onClick={() => {
                  this.handleStatusChange("Reject");
                }}
              >
                Rejected
              </Nav.Link>
            </Nav.Item>
          </Nav>
        <div style={{ maxHeight: "54vh", overflowY: "auto" ,minHeight:"54vh"}}>
          {filteredOrderInfos.length > 0 && (
            <Table striped bordered className="carts my-3">
              <thead>
                <tr>
                  <th>ID Invoice</th>
                  <th>Date purchased</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone contact</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrderInfos.map((orderInfo) => (
                  <tr key={orderInfo.id}>
                    <td>{orderInfo.id}</td>
                    <td>{orderInfo.date}</td>
                    <td>{orderInfo.userDto.name}</td>
                    <td>{orderInfo.address}</td>
                    <td>{orderInfo.phoneContact}</td>
                    <td style={{ color: "#670000", fontWeight: "700" }}>{orderInfo.total}$</td>
                    <td>
                      <Dropdown className="action-invoice">
                        <Dropdown.Toggle  id="dropdown-basic">
                          Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              this.viewDetail(orderInfo.id);
                            }}
                          >
                            View detail
                          </Dropdown.Item>
                          {orderInfo.status === "InProgress" ? (
                            <Dropdown.Item
                              onClick={() => {
                                this.setStatus(orderInfo, "Reject");
                              }}
                            >
                              Reject
                            </Dropdown.Item>
                          ) : (
                            <></>
                          )}
                          {/* {orderInfo.status === "InProgress" ? (
                            <Dropdown.Item
                              onClick={() => {
                                this.setStatus(orderInfo, "Completed");
                              }}
                            >
                              Completed
                            </Dropdown.Item>
                          ) : (
                            <></>
                          )} */}
                          {orderInfo.status === "Delivering" ? (
                            <Dropdown.Item
                              onClick={() => {
                                this.setStatus(orderInfo, "Completed");
                              }}
                            >
                              Completed
                            </Dropdown.Item>
                          ) : (
                            <></>
                          )}
                          {orderInfo.status === "Completed" ? (
                            <Dropdown.Item
                              onClick={() => {
                                this.setStatus(orderInfo, "Refund");
                              }}
                            >
                              Refund
                            </Dropdown.Item>
                          ) : (
                            <></>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {showProductModal && (
            <ModalShowProduct
              heading="Products"
              cartsPay={cartsPay}
              handleClose={() => this.setState({ showProductModal: false })}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  orderInfos: state.paymentReducer.orderInfos,
  cartsPay: state.paymentReducer.cartsPay,
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  getAllCartsByOrderInfo,
  getAllOrderInfoByIdUser,
  clearPaymentState,
  setStatus,
  setUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ShoppingHistory)
);
