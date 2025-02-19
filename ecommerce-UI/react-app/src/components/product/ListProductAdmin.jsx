import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import { setError } from "../../redux/actions/commonAction";
import {
  getAllProductsActive,
  clearStateProduct,
  setProductState,
  deleteProductById,
  changeStatus
} from "../../redux/actions/productAction";
import Pagination from "react-bootstrap/Pagination";
import { connect } from "react-redux";
class ListProductAdmin extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      showProduct: [],
      currentPage: 1,
      recordsPerPage: 3,
    };
    this.searchInput = React.createRef();
  }
  
  showPagination = () => {
    let items = [];
    const { products } = this.props;
    const { recordsPerPage, currentPage } = this.state;
    let active = currentPage;

    if (products) {
      const npage = Math.ceil(products.length / recordsPerPage);
      for (let number = 1; number <= npage; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            onClick={() => {
              this.setState({ currentPage: number });
              
            }}
          >
            {number}
          </Pagination.Item>
        );
      }
      return (
        <div>
          <Pagination>{items}</Pagination>
          <br />
        </div>
      );
    } else {
      return <></>;
    }
  };
  handleEditClick = (id) => {
    if (id) {
      const { navigate } = this.props.router;
      this.props.setProductState(id);
      navigate("/admin/productAdmin/update/" + id);
      return;
    }
    return this.props.setError("Something was wrong!");
  };
  handleDeleteClick = (id) => {
    if (id) {
      const { navigate } = this.props.router;
      this.props.changeStatus(id, "Inactive", navigate);
      return;
    }
    return this.props.setError("Something was wrong!");
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
  showProductByPage = () => {
    const { currentPage, recordsPerPage } = this.state;
    const { products } = this.props;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const showProductByPage = products.slice(firstIndex, lastIndex);
    const showProduct = showProductByPage.map((product, index) => (
      <tr key={index}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{product.description}</Tooltip>}
          >
            <div className="desc-wrap">{product.description}</div>
          </OverlayTrigger>
        </td>
        <td>{product.category.name}</td>
        <td>{product.quantity}</td>
        {/* <td>
          {product.status === "Active" ? (
            <div
              style={{
                border: "1px solid green",
                borderRadius: "3px",
                color: "green",
                maxWidth: "120px",
                textAlign: "center",
              }}
            >
              Active
            </div>
          ) : (
            <div
              style={{
                border: "1px solid red",
                borderRadius: "3px",
                color: "red",
                maxWidth: "120px",
                textAlign: "center",
              }}
            >
              Inactive
            </div>
          )}
        </td> */}
        <td>
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            width="100"
          />
        </td>
        <td>
          <Button
            variant="primary"
            style={{ padding: "0px 20px 0" }}
            onClick={() => this.handleEditClick(product.id)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            style={{ padding: "0px 10px 0" }}
            onClick={() => this.handleDeleteClick(product.id)}
          >
            Remove
          </Button>
        </td>
      </tr>
    ));
    return showProduct;
  };
  async componentDidMount() {
    try {
      await Promise.all([this.props.getAllProductsActive()]);

      const { searchQuery } = this.state;

      if (searchQuery === "") {
        const showProduct = this.showProductByPage();

        this.setState({ showProduct, searchQuery });
      }
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  }
  componentWillUnmount = () => {
    this.props.clearStateProduct();
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
  componentDidUpdate(prevProps, prevState) {
    // If the search query has changed, focus on the input element
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.searchInput.current.focus();
    }
    if (this.state.currentPage !== prevState.currentPage) {
      const showProduct = this.showProductByPage();
      this.setState({ showProduct });
    }
  }
  handleSearch = (event) => {
    const searchQuery = event.target.value;
    const { products } = this.props;
    if (searchQuery === "") {
      const { recordsPerPage } = this.state;
      const showProductByPage = products.slice(0, recordsPerPage);
      const showProduct = showProductByPage.map((product, index) => (
        <tr key={index}>
          <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{product.description}</Tooltip>}
          >
            <div className="desc-wrap">{product.description}</div>
          </OverlayTrigger>
        </td>
        <td>{product.category.name}</td>
        <td>{product.quantity}</td>
        {/* <td>
          {product.status === "Active" ? (
            <div
              style={{
                border: "1px solid green",
                borderRadius: "3px",
                color: "green",
                maxWidth: "120px",
                textAlign: "center",
              }}
            >
              Active
            </div>
          ) : (
            <div
              style={{
                border: "1px solid red",
                borderRadius: "3px",
                color: "red",
                maxWidth: "120px",
                textAlign: "center",
              }}
            >
              Inactive
            </div>
          )}
        </td> */}
        <td>
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            width="100"
          />
        </td>
        <td>
          <Button
            variant="primary"
            style={{ padding: "0px 20px 0" }}
            onClick={() => this.handleEditClick(product.id)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            style={{ padding: "0px 10px 0" }}
            onClick={() => this.handleDeleteClick(product.id)}
          >
            Remove
          </Button>
        </td>
        </tr>
      ));
  
      this.setState({
        searchQuery,
        currentPage: 1,
        showProduct
      });
    } else {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const showProduct = filteredProducts.map((product, index) => (
      <tr key={index}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{product.description}</Tooltip>}
          >
            <div className="desc-wrap">{product.description}</div>
          </OverlayTrigger>
        </td>
        <td>{product.category.name}</td>
        <td>{product.quantity}</td>
        {/* <td>
          {product.status === "Active" ? (
            <div
              style={{
                border: "1px solid green",
                borderRadius: "3px",
                color: "green",
                maxWidth: "120px",
                textAlign: "center",
              }}
            >
              Active
            </div>
          ) : (
            <div
              style={{
                border: "1px solid red",
                borderRadius: "3px",
                color: "red",
                maxWidth: "120px",
                textAlign: "center",
              }}
            >
              Inactive
            </div>
          )}
        </td> */}
        <td>
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            width="100"
          />
        </td>
        <td>
          <Button
            variant="primary"
            style={{ padding: "0px 20px 0" }}
            onClick={() => this.handleEditClick(product.id)}
          >
            Edit
          </Button>{" "}
          <Button
            variant="danger"
            style={{ padding: "0px 10px 0" }}
            onClick={() => this.handleDeleteClick(product.id)}
          >
            Remove
          </Button>
        </td>
      </tr>
    ));
    this.setState({ showProduct, searchQuery });}
  };
  render() {
    const { products } = this.props;
    const { searchQuery, showProduct } = this.state;
    return (
      <>
        <input
          key="search-input"
          type="text"
          value={searchQuery}
          onChange={this.handleSearch}
          placeholder="Search products by name"
          ref={this.searchInput}
          className="col-6 find-product"
        />

        <div style={{ maxHeight: "54vh", overflowY: "auto" }}>
          {this.renderErrorMessage()}
          {this.renderMessage()}

          <Table striped bordered className="carts" >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price($)</th>
                <th>Description</th>
                <th>Category</th>
                <th>Quantity</th>
                
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{showProduct}</tbody>
          </Table>
          {this.showPagination()}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.productReducer.products,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  setError,
  getAllProductsActive,
  clearStateProduct,
  setProductState,
  deleteProductById,
  changeStatus
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListProductAdmin)
);
