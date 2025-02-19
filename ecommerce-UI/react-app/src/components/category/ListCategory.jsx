import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getAllCategoriesActive,
  clearStateCategory,
  setCategoryState,
  deleteCategoryById,
  changeStatus
} from "../../redux/actions/categoryAction";
import { setError, setMessage } from "../../redux/actions/commonAction";
import ModalShowError from "../../helpers/ModalShowError";
import ModalShowMessage from "../../helpers/ModalShowMessage";
class ListCategory extends Component {
  handleEditClick = (id) => {
    if (id) {
      const { navigate } = this.props.router;
      this.props.setCategoryState(id);
      navigate("/admin/categoryAdmin/update/" + id);
      return;
    }
    return this.props.setError("Something was wrong!");
  };

  handleDeleteClick = (id) => {
    if (id) {
      const { navigate } = this.props.router;
      this.props.changeStatus("Invisible", id, navigate);
      return;
    }
    return this.props.setError("Something was wrong!");
  };
  componentDidMount = () => {
    this.props.getAllCategoriesActive();
  };
  componentWillUnmount = () => {
    this.props.clearStateCategory();
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
    const { categories } = this.props;
    return (
      <div style={{ maxHeight:"60vh",overflowY:"auto" }}>
        {this.renderErrorMessage()}
        {this.renderMessage()}
        <Table striped bordered className="carts">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                {/* <td>
                  {category.status === "Visible" ? (
                    <button
                      style={{
                        border: "1px solid green",
                        borderRadius: "3px",
                        color: "green",
                        maxWidth: "120px",
                        textAlign: "center",
                        padding: "0 15px 0",
                      }}
                    >
                      Visible
                    </button>
                  ) : (
                    <button
                      style={{
                        border: "1px solid red",
                        borderRadius: "3px",
                        color: "red",
                        maxWidth: "120px",
                        textAlign: "center",
                        padding: "0 15px 0",
                      }}
                    >
                      Invisible
                    </button>
                  )}
                </td> */}
                <td>
                  <Button
                    variant="primary"
                    style={{padding:"0px 20px 0"}}
                    onClick={() => this.handleEditClick(category.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    style={{padding:"0px 10px 0"}}
                    onClick={() => this.handleDeleteClick(category.id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categoryReducer.categories,
  error: state.commonReducer.error,
  message: state.commonReducer.message,
});

const mapDispatchToProps = {
  setError,
  getAllCategoriesActive,
  clearStateCategory,
  setCategoryState,
  setMessage,
  deleteCategoryById,
  changeStatus
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListCategory)
);
