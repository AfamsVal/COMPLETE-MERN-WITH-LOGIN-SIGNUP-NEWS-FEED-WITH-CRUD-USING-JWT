import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const Logout = (props) => {
  useEffect(() => {
    localStorage.removeItem("jwt-token");

    props.history.push("/login");
  });

  return <div>Logout</div>;
};

export default withRouter(Logout);
