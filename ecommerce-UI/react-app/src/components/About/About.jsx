import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import "./About.css";
import { Carousel } from "react-bootstrap";
class About extends Component {
  render() {
    return (
      <div>
        <section className="carousel carousel-product">
          <div className="container-fluid carousel-main">
            <div className="carousel-bg">
              <div className="carousel-pro-cap">
                <h1>About</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item active" aria-current="page" style={{color:"#fd8f5f"}}>
                      About
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="products container pd-section">
          <div className="container-custom1">
            <div className="row justify-content-center">
              <div className="col-md-9">
                <div className="heading-custom-pro">
                  <h2>Our Story</h2>
                  <p className="story-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
            </div>
            <Carousel>
              <Carousel.Item style={{ position: "relative" }}>
                <img
                  className="d-block"
                  style={{ minHeight: "250px" ,width:"100%"}}
                  src="../../../product13.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ position: "relative" }}>
                <img
                  className="d-block"
                  style={{ minHeight: "250px" ,width:"100%"}}
                  src="../../../product13.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ position: "relative" }}>
                <img
                  className="d-block"
                  style={{ minHeight: "250px" ,width:"100%"}}
                  src="../../../product13.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
            <div className="row justify-content-center pt-5">
              <div className="col-md-9">
                <div className="heading-custom-pro">
                  <h2>2023</h2>
                  <p className="story-paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias itaque hic sunt dolor quam accusamus eum delectus
                    quos aspernatur rerum voluptate fuga nemo inventore ad nisi,
                    consectetur neque cupiditate aperiam qui, quibusdam quaerat
                    ex? Alias?
                  </p>
                </div>
              </div>
            </div>
            <Carousel>
              <Carousel.Item style={{ position: "relative" }}>
                <img
                  className="d-block"
                  style={{ minHeight: "250px" ,width:"100%"}}
                  src="../../../product13.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ position: "relative" }}>
                <img
                  className="d-block"
                  style={{ minHeight: "250px" ,width:"100%"}}
                  src="../../../product13.jpg"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item style={{ position: "relative" }}>
                <img
                  className="d-block"
                  style={{ minHeight: "250px" ,width:"100%"}}
                  src="../../../product13.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(About);
