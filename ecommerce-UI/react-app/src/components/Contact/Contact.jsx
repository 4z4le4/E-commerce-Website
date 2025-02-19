import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import "./Contact.css"
class Contact extends Component {
  render() {
    return (
      <div className="contact-container">
        <div className="contact-form m-2">
          <h2>Contact Us</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" className="custom-button">Send</button>
          </form>
        </div>
        <div className="contact-info m-2">
          <h2>Contact Information</h2>
          <div className="info-item">
            <i className="fas fa-phone-alt"></i>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>Email: info@example.com</p>
          </div>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>Address: 123 Main St, Anytown USA</p>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Contact);
