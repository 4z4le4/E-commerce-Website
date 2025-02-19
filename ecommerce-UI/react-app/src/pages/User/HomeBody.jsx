import React, { Component } from "react";

import { Button, Carousel } from "react-bootstrap";
import withRouter from "../../helpers/withRouter";
import "./HomeBody.css";
class HomeBody extends Component {
  render() {
    return (
      <div style={{ width: "100%" }} >
        <Carousel className="carousel">
          <Carousel.Item style={{ position: "relative" }}>
            <div className="carousel_caption">
              <span className="pulse">70% sale off</span>
              <h1>Furniture at cost</h1>
              <p>
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
              <button
                className="custom-button"
                onClick={() => {
                  this.props.toggleShowBody(false);
                  const { navigate } = this.props.router;
                  navigate("/product");
                }}
              >
                Discover more
              </button>
            </div>
            <img
              className="d-block"
              style={{ minHeight: "250px" }}
              src="../../../slider.png.webp"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ position: "relative" }}>
            <div className="carousel_caption">
              <span className="pulse">70% sale off</span>
              <h1>Furniture at cost</h1>
              <p>
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
              <button
                className="custom-button"
                onClick={() => {
                  this.props.toggleShowBody(false);
                  const { navigate } = this.props.router;
                  navigate("/product");
                }}
              >
                Discover more
              </button>
            </div>
            <img
              className="d-block"
              style={{ minHeight: "250px" }}
              src="../../../product13.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item style={{ position: "relative" }}>
            <div className="carousel_caption">
              <span className="pulse">70% sale off</span>
              <h1>Furniture at cost</h1>
              <p>
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla.
              </p>
              <button
                className="custom-button"
                onClick={() => {
                  this.props.toggleShowBody(false);
                  const { navigate } = this.props.router;
                  navigate("/product");
                }}
              >
                Discover more
              </button>
            </div>
            <img
              className="d-block"
              style={{ minHeight: "250px" }}
              src="../../../product13.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>TOP PICK</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
              <div className="product col-12">
                  <img src="../../../product2.png.webp" alt="Product 1" />
                  <h3>Product 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button
                    className="custom-button"
                    onClick={() => {
                      this.props.toggleShowBody(false);
                      const { navigate } = this.props.router;
                      navigate("/product");
                    }}
                  >
                    Buy now
                  </button>
                </div>
              </div>
              <div className="col-md-4">
              <div className="product col-12">
                  <img src="../../../product3.png.webp" alt="Product 2" />
                  <h3>Product 2</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button
                    className="custom-button"
                    onClick={() => {
                      this.props.toggleShowBody(false);
                      const { navigate } = this.props.router;
                      navigate("/product");
                    }}
                  >
                    Buy now
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="product col-12">
                  <img src="../../../product4.png.webp" alt="Product 3" />
                  <h3>Product 3</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button
                    className="custom-button"
                    onClick={() => {
                      this.props.toggleShowBody(false);
                      const { navigate } = this.props.router;
                      navigate("/product");
                    }}
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-about-us">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>About Us</h2>
              </div>
            </div>
            
          </div>
          <div className="row" style={{maxWidth:"100%"}}>
              <div className="col-md-6 my-3 col-12">
                <div className="about-us-image-wrapper">
                </div>
              </div>
              <div className="col-md-6">
                <div className="about-us-text-wrapper my-3">
                  <h3 className="about-us-title"
                    onClick={() => {
                      this.props.toggleShowBody(false);
                      const { navigate } = this.props.router;
                      navigate("/about");
                    }} >Our Story</h3>
                  <p className="about-us-description wave-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam erat volutpat. Sed semper ut ex quis blandit. Duis
                    non felis ut ex tristique lacinia. Duis euismod, ligula non
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In cupiditate quae aut vel minima accusantium saepe illo! Quasi molestias laborum quis est obcaecati laudantium veniam esse reiciendis omnis, nisi itaque earum saepe ipsa aliquid assumenda, tenetur nesciunt ducimus officiis autem rerum nostrum. Nostrum, aut unde illum debitis quasi minima iste!
                  </p>
                </div>
              </div>
            </div>
        </div>
        <section className="instagram_area container-fluid">
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="instagram_caption col-lg-3 col-12 row align-items-center my-2">
              <div className="row justify-content-start">
                <div className="instagram_logo px-0">
                  <img src="../../../insta.png.webp" alt="instagramLogo" />
                </div>
                <div className="heading_custom2">
                  <h2 style={{textTransform:"uppercase"}}>GET INSPIRED WITH INSTAGRAm</h2>
                  <p>
                    Suspendisse varius enim in eros elementum tristique. Duis
                    cursus, mi quis viverra ornare, eros dolor interdum nulla.
                  </p>
                </div>
                <button
                className="custom-button"
                onClick={() => {
                  this.props.toggleShowBody(false);
                  const { navigate } = this.props.router;
                  navigate("/product");
                }}
                style={{maxWidth:"250px"}}
              >
                Discover more
              </button>
              </div>
            </div>
            <div className="instagram_banners col-lg-9 col-12 my-2" style={{padding:"80px 0 80px"}}>
              <div className="row">
                <div className="instagram_banner col-md-6 col-12 p-0">
                  <div className="instagram_img w-100">
                    <img
                      src="../../../instra1.png.webp"
                      alt="banner_instagram"
                    />
                  </div>
                  <div className="instagram_link">
                    <a onClick={() => {
                  this.props.toggleShowBody(false);
                  const { navigate } = this.props.router;
                  navigate("/product");
                }} style={{cursor:"pointer"}}><i className="fa-brands fa-instagram"></i></a>
                  </div>
                </div>
                <div className="instagram_banner col-md-6 col-12 p-0">
                  <div className="instagram_img w-100">
                    <img
                      src="../../../instra2.png.webp"
                      alt="banner_instagram"
                    />
                  </div>
                  <div className="instagram_link">
                    <a onClick={() => {
                  this.props.toggleShowBody(false);
                  const { navigate } = this.props.router;
                  navigate("/product");
                }} style={{cursor:"pointer"}}><i className="fa-brands fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
}
export default withRouter(HomeBody);
