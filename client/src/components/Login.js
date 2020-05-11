import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Lock from "../images/lock.png";
import classnames from "classnames";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {},
      showPwd: false,
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  //componentDidUpdate(prevProps, prevState) {}

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (this.state.email.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { email: "Email is required..." },
      });
      return;
    }
    if (this.state.password.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { password: "Password is required" },
      });
      return;
    }

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    const header = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios
      .post("/auth/login", user, header)
      .then((res) => {
        if (res.data.token) {
          this.setState({
            ...this.state,
            email: "",
            password: "",
            error: {},
            isLoading: false,
          });
          localStorage.setItem("jwt-token", JSON.stringify(res.data.token));
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          isLoading: false,
          error: err.response.data,
        });
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.error.email) {
      if (e.target.name === "email") this.setState({ error: {} });
    }
    if (this.state.error.password) {
      if (e.target.name === "password") this.setState({ error: {} });
    }
  }

  render() {
    return (
      <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <form onSubmit={this.onSubmit} className="form-signin mt-5">
          <div className="text-center mb-4">
            <img
              className="mb-4 rounded-circle"
              src={Lock}
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 font-weight-normal">Login Now...</h1>
          </div>

          <div className="form-label-group">
            <label htmlFor="inputEmail">
              {this.state.error.email ? (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.email}**
                </label>
              ) : (
                <label>Email address</label>
              )}
            </label>
            <input
              type="email"
              id="inputEmail"
              className={classnames("form-control", {
                "is-invalid": this.state.error.email,
              })}
              placeholder="Email address"
              autoFocus
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>

          <div className="form-label-group">
            <label htmlFor="inputPassword">
              {this.state.error.password ? (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.password}**
                </label>
              ) : (
                <label>Password</label>
              )}
            </label>
            <input
              type={this.state.showPwd ? "text" : "password"}
              id="inputPassword"
              className={classnames("form-control", {
                "is-invalid": this.state.error.password,
              })}
              placeholder="Enter Password"
              onChange={this.onChange}
              name="password"
              value={this.state.password}
            />
          </div>

          <div className="custom-control custom-switch mt-1 mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="switch1"
              checked={this.state.showPwd}
              onChange={() =>
                this.setState({
                  ...this.state,
                  showPwd: !this.state.showPwd,
                })
              }
            />
            <label className="custom-control-label" htmlFor="switch1">
              Show Password
            </label>
          </div>
          <button className="btn btn-lg btn-info btn-block" type="submit">
            <span
              className={classnames("", {
                "spinner-border spinner-border-sm": this.state.isLoading,
              })}
            ></span>{" "}
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted text-center">© 2017-2019</p>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
