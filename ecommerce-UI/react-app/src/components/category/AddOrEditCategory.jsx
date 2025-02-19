import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import {
  insertCategory,
  clearStateCategory,
  updateCategory,
} from "../../redux/actions/categoryAction";
import { setError } from "../../redux/actions/commonAction";
import ModalShowError from "../../helpers/ModalShowError";
class AddOrEditCategory extends Component {
  constructor() {
    super();
    this.state = {
      category: {
        id: "",
        name: "",
        status: "Visible",
      },
    };
  }
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.category && prevState.category.id !== nextProps.category.id) {
      return {
        ...prevState,
        category: nextProps.category,
      };
    } else if (!nextProps.category) {
      return {
        ...prevState,
        category: { id: "", name: "", status: "Visible" },
      };
    }
    return null;
  };
  componentDidMount = () => {
    const { category } = this.props;
    const { id } = this.props.router.params;
    if (category && id) {
      this.setState({ ...this.state, category: category });
    }
  };
  componentWillUnmount = () => {
    this.props.clearStateCategory();
  };
  saveCategory = (event) => {
    event.preventDefault();
    const id = event.target.elements.id.value;
    const name = event.target.elements.name.value;
    const status = event.target.elements.status.value;
    if (name === "") {
      this.props.setError("Name is required!");
      return;
    }
    if (status === "") {
      this.props.setError("Status is required!");
      return;
    }
    if (id === "") {
      const { category } = this.state;
      const { navigate } = this.props.router;
      category.name = name;
      category.status = status;
      this.props.insertCategory(category, navigate);
      return;
    }
    if (id) {
      const { category } = this.state;
      const { navigate } = this.props.router;
      const updatedCategory = {
        ...category,
        id: id,
        name: name,
        status: status,
      };
      this.props.updateCategory(updatedCategory, navigate);
      return;
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
  render() {
    const { id } = this.props.router.params;
    const { category } = this.props;
    const defaultStatusValue =
      category?.status === "Invisible" ? "Invisible" : "Visible";
    return (
      <div>
        <Form
          onSubmit={this.saveCategory}
          className="px-3 orderinfo-form"
          key={category.name + "$"}
        >
          {this.renderErrorMessage()}
          <Form.Group className="mb-3" hidden={id ? false : true}>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              readOnly
              defaultValue={category ? category.id : ""}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              defaultValue={category ? category.name : ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" hidden>
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" defaultValue="Visible" style={{cursor:"pointer"}}>
              <option value="Visible">Visible</option>
              
            </Form.Select>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <div className="d-flex justify-content-lg-end">
              <button type="submit" style={{ marginRight: "20px" }} className="check-out">
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
  category: state.categoryReducer.category,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  insertCategory,
  setError,
  clearStateCategory,
  updateCategory,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddOrEditCategory)
);
