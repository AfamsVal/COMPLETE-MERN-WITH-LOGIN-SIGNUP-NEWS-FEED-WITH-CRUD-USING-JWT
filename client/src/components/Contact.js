import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-modal/styles.css";

function Contact() {
  return (
    <div className="col-md-12">
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-8 col-sm-8 col-12 p-lg-5 mx-auto my-3">
          <h1 className="display-4 font-weight-normal text-info">
            About Laffout
          </h1>
          <p className="lead font-weight-normal">
            For information about the developer, kindly reach me on
            <span className="text-info">
              <strong>
                {" "}
                <u>progfams@gmail.com</u>
              </strong>
            </span>{" "}
            . I am currently working hard in perfecting on my programming skill.
          </p>
          <p className="text-center text-info">+2348037514469</p>
          <Link className="btn btn-outline-info btn-lg" to="#">
            Coming soon
          </Link>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
    </div>
  );
}

export default Contact;
