import React, { Component } from "react";
import LockImg from "../images/lock.png";
import axios from "axios";
import { withRouter } from "react-router-dom";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      email: "",
      gender: "",
      password1: "",
      password2: "",
      error: {},
      isLoading: false,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //componentDidUpdate(prevProps, prevState) { }

  onChangeText(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.error.name) {
      if (e.target.name === "name") this.setState({ error: {} });
    }
    if (this.state.error.age) {
      if (e.target.name === "age") this.setState({ error: {} });
    }
    if (this.state.error.email) {
      if (e.target.name === "email") this.setState({ error: {} });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ ...this.state, isLoading: true });
    const { name, age, email, gender, password1, password2 } = this.state;
    if (name.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { name: "Username is required*" },
      });
      return;
    }
    if (name.trim().length > 15) {
      this.setState({
        ...this.state,
        error: { name: "Username is more than 15 chars*" },
      });
      return;
    }
    if (age.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { age: "Age is required*" },
      });
      return;
    }
    if (email.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { email: "Email is required*" },
      });
      return;
    }
    if (gender.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { gender: "Gender is required*" },
      });
      return;
    }
    if (password1.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { password1: "Password is required*" },
      });
      return;
    }
    if (password1.trim() !== password2.trim()) {
      this.setState({
        ...this.state,
        error: { password2: "Password does not match*" },
      });
      return;
    }

    const newUser = {
      name,
      age,
      email,
      gender,
      password1,
      password2,
    };

    const header = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post("/auth/register", newUser, header)
      .then((user) => {
        if (user.data.token) {
          this.setState({
            ...this.state,
            error: {},
            name: "",
            age: "",
            email: "",
            gender: "",
            password1: "",
            password2: "",
            isLoading: false,
            regSuccess: true,
          });
          setTimeout(() => {
            this.setState({ regSuccess: false });
            this.props.history.push("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          error: err.response.data,
          isLoading: false,
        });
      });
  }

  render() {
    const loader = this.state.isLoading ? (
      <button className="btn btn-lg btn-info btn-block" type="submit">
        <span className="spinner-border spinner-border-sm"></span> Register Now
      </button>
    ) : (
      <button className="btn btn-lg btn-info btn-block" type="submit">
        Register Now
      </button>
    );
    const nameError = this.state.error.name
      ? "form-control is-invalid"
      : "form-control";
    const ageError = this.state.error.age
      ? "form-control is-invalid"
      : "form-control";
    const emailError = this.state.error.email
      ? "form-control is-invalid"
      : "form-control";
    const password1Error = this.state.error.password1
      ? "form-control is-invalid"
      : "form-control";
    const password2Error = this.state.error.password2
      ? "form-control is-invalid"
      : "form-control";
    return (
      <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <form onSubmit={this.onSubmit} className="form-group mt-5">
          <div className="row">
            <div className="text-center mb-4 col-md-12">
              <img
                className="mb-4 rounded-circle"
                src={LockImg}
                alt=""
                width="72"
                height="72"
              />
              <h1 className="h3 mb-3 font-weight-normal">
                Create Account Today...
              </h1>
            </div>
            <div className="col-12">
              {this.state.error.name && (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.name}*
                </label>
              )}
              {this.state.error.age && (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.age}*
                </label>
              )}
              {this.state.error.email && (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.email}*
                </label>
              )}
              {this.state.error.gender && (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.gender}*
                </label>
              )}
              {this.state.error.password1 && (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.password1}*
                </label>
              )}
              {this.state.error.password2 && (
                <label className="text-center" style={{ color: "red" }}>
                  {this.state.error.password2}*
                </label>
              )}
              {this.state.regSuccess && (
                <label className="text-center" style={{ color: "green" }}>
                  Registration Success!!
                </label>
              )}
            </div>
            <div className="form-group col-md-6">
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.onChangeText}
                className={nameError}
                placeholder="Enter Username..."
                autoFocus
              />
            </div>

            <div className="form-group col-md-6">
              <input
                type="number"
                name="age"
                id="age"
                value={this.state.age}
                onChange={this.onChangeText}
                className={ageError}
                placeholder="Enter Age..."
              />
            </div>
            <div className="form-group col-md-6">
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChangeText}
                className={emailError}
                placeholder="Email address..."
              />
            </div>
            <div className="form-group mb-3 col-md-6">
              <label>
                Gender:
                {"  "}
                {"  "}
                <input
                  type="radio"
                  onChange={this.onChangeText}
                  name="gender"
                  value="male"
                />{" "}
                Male
              </label>
              {"  "}
              {"  "}
              <label>
                <input
                  type="radio"
                  onChange={this.onChangeText}
                  name="gender"
                  value="female"
                />{" "}
                Female
              </label>
            </div>
            <div className="form-group col-md-12">
              <input
                type="password"
                name="password1"
                value={this.state.password1}
                onChange={this.onChangeText}
                className={password1Error}
                placeholder="Enter Password..."
              />
            </div>

            <div className="form-group col-md-12">
              <input
                type="password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChangeText}
                className={password2Error}
                placeholder="Confirm Password..."
              />
            </div>

            <div className="form-group mb-3 col-md-12">{loader}</div>

            <p className="mt-5 col-12 mb-3 text-center">
              © {new Date().getFullYear()}
            </p>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(AddUser);
