import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
import {
  getAllCategories,
  clearStateCategory,
} from "../../redux/actions/categoryAction";
import { insertCart, getCartsByIdUser } from "../../redux/actions/cartAction";
import {
  getAllProducts,
  clearStateProduct,
} from "../../redux/actions/productAction";
import { Button, Card, Pagination } from "react-bootstrap";
import "./Product.css";
import ModalShowDetailProduct from "../../helpers/ModalShowDetailProduct";
import { setError } from "../../redux/actions/commonAction";
class Product extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: "",
      idCategory: "All",
      showDetail: false,
      detailProduct: {},
      showProduct: [],
      currentPage: 1,
      recordsPerPage: 3,
      filteredProducts: [],
    };
    this.searchInput = React.createRef();
  }
  showPagination = (data) => {
    let items = [];

    const { recordsPerPage, currentPage } = this.state;
    let active = currentPage;

    if (data) {
      const npage = Math.ceil(data.length / recordsPerPage);
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
        <div key={npage}>
          <Pagination>{items}</Pagination>
          <br />
        </div>
      );
    } else {
      return <></>;
    }
  };
  showProductByPage = (data) => {
    const { currentPage, recordsPerPage } = this.state;
    // const { products } = this.props;

    if (!data || !Array.isArray(data)) {
      return null;
    }
    if (Math.ceil(data.length / recordsPerPage) < currentPage) {
      this.setState({ currentPage: 1 });
    }
    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;
    const showProductByPage = data.slice(firstIndex, lastIndex);
    const showProduct = showProductByPage.map((product, index) => (
      <div
        className="col-md-6 col-xl-4 p-3"
        key={product.id + "@"}
        style={{ cursor: "pointer" }}
      >
        <Card style={{ maxHeight: "450px", minHeight: "450px" }}>
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${product.image}`}
            onClick={() => {
              this.viewDetail(product);
            }}
            style={{ cursor: "pointer" }}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text style={{ fontWeight: "700", color: "green" }}>
              Available: {product.quantity}
            </Card.Text>
            <Card.Text className="price">{product.price}$</Card.Text>
            <button
              className="add-to-cart "
              onClick={() => this.addToCart(product.id, 1)}
            >
              Add To Cart
            </button>
          </Card.Body>
        </Card>
      </div>
    ));
    showProduct.push(this.showPagination(data));
    return showProduct;
  };
  viewDetail = async (product) => {
    this.setState({ detailProduct: product, showDetail: true });
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
  showCategories = () => {
    const { categories, products } = this.props;
    if (!categories) {
      return;
    }

    let showCategory = categories.map((category) => {
      if (category.status === "Visible") {
        let filteredProducts = products.filter(
          (product) =>
            product.status === "Active" && product.category.id === category.id
        );
        if (filteredProducts.length > 0) {
          return (
            <button
              key={category.id}
              value={category.id}
              className="col-lg-2 col-sm-3 m-2"
              onClick={() => this.showProductsByIdCategory(category.id)}
            >
              {category.name}
            </button>
          );
        }
      }
    });
    return showCategory;
  };
  async componentDidMount() {
    try {
      await Promise.all([
        this.props.getAllCategories(),
        this.props.getAllProducts(),
      ]);
      this.showProductsByIdCategory("All");
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  }
  componentWillUnmount = () => {
    this.props.clearStateCategory();
    this.props.clearStateProduct();
  };
  addToCart = async (idProduct, quantity) => {
    if (quantity <= 0) {
      this.props.setError("Quantity have to be positive!");
      return;
    }
    const { navigate } = this.props.router;
    const { user } = this.props;
    if (Object.keys(user).length === 0) {
      navigate("/login");
      return;
    }
    let cart = {
      userId: user.id,
      productId: idProduct,
      quantity: quantity,
    };
    try {
      await this.props.insertCart(cart);
      await this.props.getCartsByIdUser(user.id);
    } catch (error) {
      console.log(error);
      // display error message to user
    }
  };
  showProductsByIdCategory = (id) => {
    const { products } = this.props;
    if (!products) {
      return;
    }
    this.setState({ currentPage: 1 });
    if (id !== this.state.idCategory) {
      let filteredProducts;
      if (id !== "All") {
        filteredProducts = products.filter(
          (product) =>
            product.status === "Active" &&
            product.category.id === id &&
            product.quantity > 0
        );
      } else {
        filteredProducts = products.filter(
          (product) => product.status === "Active" && product.quantity > 0
        );
      }
      let showProduct = this.showProductByPage(filteredProducts);
      this.setState({
        idCategory: id,
        showProduct: showProduct,
        filteredProducts,
      });
    } else {
      let filteredProducts;
      if (id !== "All") {
        filteredProducts = products.filter(
          (product) =>
            product.status === "Active" &&
            product.category.id === id &&
            product.quantity > 0
        );
      } else {
        filteredProducts = products.filter(
          (product) => product.status === "Active" && product.quantity > 0
        );
      }
      let showProduct = this.showProductByPage(filteredProducts);
      this.setState({
        idCategory: "All",
        showProduct: showProduct,
        filteredProducts,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // If the search query has changed, focus on the input element
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.searchInput.current.focus();
    }
    if (this.state.currentPage !== prevState.currentPage) {
      const showProduct = this.showProductByPage(this.state.filteredProducts);
      this.setState({ showProduct });
    }
  }
  handleSearch = (event) => {
    const searchQuery = event.target.value;
    const { products } = this.props;

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const showProduct = filteredProducts.map((product) => (
      <div
        className="col-md-6 col-xl-4 p-3 product-show"
        key={product.id + "@"}
        style={{ cursor: "pointer" }}
      >
        <Card style={{ maxHeight: "450px", minHeight: "450px" }}>
          <Card.Img
            variant="top"
            src={`data:image/jpeg;base64,${product.image}`}
            onClick={() => {
              this.viewDetail(product);
            }}
            style={{ cursor: "pointer" }}
          />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text style={{ fontWeight: "700", color: "green" }}>
              Available: {product.quantity}
            </Card.Text>
            <Card.Text className="price">{product.price}$</Card.Text>
            <button
              className="add-to-cart "
              onClick={() => this.addToCart(product.id, 1)}
            >
              Add To Cart
            </button>
          </Card.Body>
        </Card>
      </div>
    ));
    this.setState({ showProduct, searchQuery });
    if (searchQuery === "") {
      // Reset current page to 1
      this.setState({ currentPage: 1 });
      // Show all products
      this.showProductsByIdCategory("All");
    }
  };

  render() {
    const { showProduct, searchQuery, showDetail, detailProduct } = this.state;
    return (
      <div className="container products-container p-3">
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <div
          className="row p-3 "
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          <div className="col-12 category-pick container">
            <div className="row p-5">
              <input
                key="search-input"
                type="text"
                value={searchQuery}
                onChange={this.handleSearch}
                placeholder="Search products by name"
                ref={this.searchInput}
                className="col-12 find-product "
              />

              <button
                key="All"
                value="All"
                className="col-md-2 col-sm-3 m-2"
                autoFocus
                onClick={() => this.showProductsByIdCategory("All")}
              >
                All
              </button>
              {this.showCategories()}
            </div>
          </div>
          <hr className="my-hr" />
          <div className="col-12 px-md-5 products" style={{ marginTop: "2rem" }}>
            <div
              className="row"
              style={{ maxHeight: "700px", overflow: "auto" }}
            >
              {showProduct}
            </div>
          </div>
        </div>
        {showDetail && (
          <ModalShowDetailProduct
            heading="Detail"
            product={detailProduct}
            addToCart={this.addToCart}
            handleClose={() => this.setState({ showDetail: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  products: state.productReducer.products,
  user: state.userReducer.user,
});
const mapDispatchToProps = {
  getAllCategories,
  clearStateCategory,
  getAllProducts,
  clearStateProduct,
  insertCart,
  getCartsByIdUser,
  setError,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Product)
);
