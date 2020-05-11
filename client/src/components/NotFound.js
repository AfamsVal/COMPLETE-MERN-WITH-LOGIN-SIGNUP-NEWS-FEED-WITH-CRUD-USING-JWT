import React from "react";

const NotFound = () => {
  return (
    <div className="col-md-12">
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-12 p-lg-5 mx-auto my-3">
          <h2 className="display-4 font-weight-normal text-danger">
            <i className="fas fa fa-info-circle"></i> PAGE NOT FOUND!
          </h2>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
    </div>
  );
};
export default NotFound;
