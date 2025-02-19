import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import { setError } from "../../redux/actions/commonAction";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getAllCategoriesActive,
  clearStateCategory,
} from "../../redux/actions/categoryAction";
import {
  insertProduct,
  clearStateProduct,
  updateProduct,
  updateProductV2,
} from "../../redux/actions/productAction";
import ModalShowMessage from "../../helpers/ModalShowMessage";
import ModalShowError from "../../helpers/ModalShowError";
class AddOrEditProduct extends Component {
  constructor() {
    super();
    this.state = {
      showImage: false,
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
  async componentDidMount() {
    await this.props.getAllCategoriesActive();
    const { product } = this.props;
    if (
      product &&
      product.image &&
      location.pathname.startsWith("/admin/productAdmin/update")
    ) {
      this.setState({ showImage: true });
    }
  }
  showUpdateImage = () => {
    const { showImage } = this.state;
    const { product } = this.props;
    if (
      showImage &&
      product &&
      product.image &&
      location.pathname.startsWith("/admin/productAdmin/update")
    ) {
      return (
        <>
          <Form.Label>Image</Form.Label>
          <Card
            style={{
              height: "200px",
              width: "200px",
              position: "relative",
              margin: "10px 0",
            }}
          >
            <Card.Img
              variant="top"
              src={`data:image/jpeg;base64,${product.image}`}
              style={{ width: "100%", height: "100%" }}
            />

            <button
              className="btn-hv-danger"
              onClick={() => {
                this.setState({ showImage: false });
              }}
              style={{
                fontSize: "14px",
                position: "absolute",
                top: "0px",
                right: "0px",
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              X
            </button>
          </Card>
        </>
      );
    } else {
      return (
        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg"
            name="image"
            multiple={false}
          />
        </Form.Group>
      );
    }
  };
  componentWillUnmount = () => {
    this.props.clearStateCategory();
    this.props.clearStateProduct();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props.router.params;
    const formData = new FormData(event.target);
    if (formData.get("name") === "") {
      this.props.setError("Name is required!");
      return;
    }
    const price = Number(formData.get("price"));
    if (isNaN(price) || price <= 0) {
      this.props.setError("Price must be a positive number!");
      return;
    }
    const quantity = Number(formData.get("quantity"));
    if (isNaN(quantity) || quantity <= 0) {
      this.props.setError("Quantity must be a positive number!");
      return;
    }

    if (formData.get("description") === "") {
      this.props.setError("Description is required!");
      return;
    }
    if (formData.get("status") === "") {
      this.props.setError("Status is required!");
      return;
    }
    if (formData.get("categoryId") === "") {
      this.props.setError("Category is required!");
      return;
    }
    const { navigate } = this.props.router;
    if (!id) {
      this.props.insertProduct(formData, navigate);
      return;
    }
    if (id) {
      if (this.state.showImage) {
        this.props.updateProductV2(id, formData, navigate);
        return;
      }
      this.props.updateProduct(id, formData, navigate);
      return;
    }
  };
  renderCategories = () => {
    let { categories } = this.props;
    if (!categories || categories.length === 0) {
      return;
    }
    let selectOptions = categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
    return selectOptions;
  };
  render() {
    const { id } = this.props.router.params;
    const { product } = this.props;
    return (
      <div>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <Form
          onSubmit={this.handleSubmit}
          className="orderinfo-form"
          encType="multipart/form-data"
          key={product.id + "$"}
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          <Form.Group className="mb-3" hidden={id ? false : true}>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              readOnly
              defaultValue={product ? id : ""}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              defaultValue={product ? product.name : ""}
            />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product price"
              name="price"
              defaultValue={product ? product.price : ""}
              max="false"
              min="0"
            />
          </Form.Group>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity are available"
              name="quantity"
              defaultValue={product ? product.quantity : ""}
              max="false"
              min="0"
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter product description"
              name="description"
              defaultValue={product ? product.description : ""}
            />
          </Form.Group>

          <Form.Group controlId="formCategoryId">
            <Form.Label>Category</Form.Label>
            <Form.Control
              style={{ cursor: "pointer" }}
              as="select"
              name="categoryId"
            >
              {this.renderCategories()}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formStatus" hidden>
            <Form.Label>Status</Form.Label>
            <Form.Control
              style={{ cursor: "pointer" }}
              as="select"
              name="status"
              defaultValue="Active"
            >
              <option>Active</option>
             
            </Form.Control>
          </Form.Group>
          {this.showUpdateImage()}
          <Form.Group className="mb-3">
            <div className="d-flex justify-content-lg-end">
              <button variant="primary" type="submit" className="check-out">
                {id ? "Update" : "Save"}
              </button>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
  product: state.productReducer.product,
});

const mapDispatchToProps = {
  setError,
  getAllCategoriesActive,
  clearStateCategory,
  insertProduct,
  clearStateProduct,
  updateProduct,
  updateProductV2,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditProduct)
);
