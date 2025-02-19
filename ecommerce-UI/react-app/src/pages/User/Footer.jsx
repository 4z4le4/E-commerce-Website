import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import withRouter from "../../helpers/withRouter";
import "./Footer.css";
class Footer extends Component {
  render() {
    return (
      <>
        <section className="categories pd_section" style={{padding: "50px 0"}}>
          <div className="container_custom1">
            <div className="categories_list row">
              <div id="cate_ani1" className="col-lg-3 col-md-6 col-12">
                <div className="categories_service mb-50">
                  <div className="categories_icon">
                    <img src="../../../services1.svg" alt="services1" />
                  </div>
                  <div className="categories_caption">
                    <h5>Fast &amp; Free Delivery</h5>
                    <p>Free delivery on all orders</p>
                  </div>
                </div>
              </div>
              <div id="cate_ani2" className="col-lg-3 col-md-6 col-12">
                <div className="categories_service mb-50">
                  <div className="categories_icon">
                    <img src="../../../services2.svg" alt="services1" />
                  </div>
                  <div className="categories_caption">
                    <h5>Fast &amp; Free Delivery</h5>
                    <p>Free delivery on all orders</p>
                  </div>
                </div>
              </div>
              <div id="cate_ani3" className="col-lg-3 col-md-6 col-12">
                <div className="categories_service mb-50">
                  <div className="categories_icon">
                    <img src="../../../services3.svg" alt="services1" />
                  </div>
                  <div className="categories_caption">
                    <h5>Fast &amp; Free Delivery</h5>
                    <p>Free delivery on all orders</p>
                  </div>
                </div>
              </div>
              <div id="cate_ani4" className="col-lg-3 col-md-6 col-12">
                <div className="categories_service mb-50">
                  <div className="categories_icon">
                    <img src="../../../services4.svg" alt="services1" />
                  </div>
                  <div className="categories_caption">
                    <h5>Fast &amp; Free Delivery</h5>
                    <p>Free delivery on all orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="container_fluid footer_wrapper">
            <div className="footer_contact pd_section">
              <div className="container_custom1">
                <div className="row justify-content-between">
                  <div className="col-lg-4 col-md-8 col-12 row justify-content-start my-5">
                    <div className="footer_contact_info">
                      <div className="contact_logo">
                        <a href="index.html">
                          <img
                            src="../../../logo2_footer.png.webp"
                            alt="logo"
                          />
                        </a>
                      </div>
                      <div className="contact_intro">
                        <p>
                          Suspendisse varius enim in eros elementum tristique.
                          Duis cursus, mi quis viverra ornare, eros dolor
                          interdum nulla.
                        </p>
                      </div>
                      <div className="contact_socials">
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-pinterest-p"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-12 row my-5 justify-content-start">
                    <div className="footer_contact_link">
                      <h4>Quick links</h4>
                      <ul>
                        <li>
                          <a href="#">Image Licensin</a>
                        </li>
                        <li>
                          <a href="#">Style Guide</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-12 my-5 row justify-content-start">
                    <div className="footer_contact_link">
                      <h4>Shop Category</h4>
                      <ul>
                        <li>
                          <a href="#">Image Licensin</a>
                        </li>
                        <li>
                          <a href="#">Style Guide</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 col-12 my-5 row justify-content-start">
                    <div className="footer_contact_link">
                      <h4>Quick links</h4>
                      <ul>
                        <li>
                          <a href="#">Image Licensin</a>
                        </li>
                        <li>
                          <a href="#">Style Guide</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer_bot">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12 text-center px-5">
                    <p>
                      All rights reserved | This template is made with{" "}
                      <i className="fa-solid fa-heart"></i> by{" "}
                      <a href="#">Group 01</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default withRouter(Footer);
