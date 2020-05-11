import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Navbar extends Component {
  state = { user: {} };

  componentDidMount() {
    //CODE FOR FETCHING AND AUTHENTICATING USER
    const token = JSON.parse(localStorage.getItem("jwt-token"));
    const header = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      header.headers["Authorization"] = token;
      axios
        .get("/auth/user", header)
        .then((user) => {
          this.setState({ ...this.state, user: user.data });
          this.props.history.push("/");
        })
        .catch((err) => {
          //console.log("aerr", err.response.data);
          this.setState({ user: {} });
          this.props.history.push("/login");
        });
    } else {
      this.setState({ user: {} });
      this.props.history.push("/login");
    }
  }
  //
  ///////
  //////
  render() {
    const loginLogout = !this.state.user.name ? (
      <>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/login">
            <i className="fas fa fa-lock"></i> login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/register">
            <i className="fas fa fa-pencil-square-o"></i> Register
          </Link>
        </li>
      </>
    ) : (
      <>
        <li className="nav-item">
          <Link className="nav-link text-white" to="">
            {this.state.user.name && <i className="fas fa fa-user" />}{" "}
            {this.state.user.name} |
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            <i className="fas fa fa-home"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="contact">
            <i className="fas fa fa-phone-square"></i> Contact Us
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ user: {} });
              this.props.history.push("/logout");
            }}
            className="nav-link text-white"
          >
            <i className="fas fa fa-unlock"></i> logout
          </a>
        </li>
      </>
    );

    return (
      <nav className="navbar navbar-expand-md  bg-info navbar-dark">
        <Link className="navbar-brand" to="/">
          LAFFOUT
        </Link>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "white" }}
          ></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className=" navbar-nav">{loginLogout}</ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
