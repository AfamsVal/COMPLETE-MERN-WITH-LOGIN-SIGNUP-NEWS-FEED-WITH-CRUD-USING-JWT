import React, { Component } from "react";
import Contents from "./Contents";
import { withRouter } from "react-router-dom";
import axios from "axios";
import loader from "../images/loader.gif";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      post: "",
      date: new Date().getTime(),
      error: {},
      success: false,
      contents: [],
      isLoading: false,
      isMounting: true,
    };
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem("jwt-token"));
    if (!token && !this.props.user) return this.props.history.push("/login");

    //////
    ////////////////////////////////
    //CODE FOR FETCHING ALL USER POST
    axios
      .get("/post", { headers: { "Content-type": "application/json" } })
      .then((post) => {
        //console.log(post.data);
        this.setState({
          ...this.state,
          isMounting: false,
          contents: [...post.data],
        });
      })
      .catch((err) => console.log(err.response.data));
  }

  ////////////////////////////////////
  //SUBMIT POST CONTENTS
  onSubmitPost(e) {
    e.preventDefault();
    this.setState({ ...this.state, isLoading: true });

    const { title, post, date } = this.state;
    if (title.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { title: "Title is required" },
      });
      return;
    } else if (title.trim().length > 25) {
      this.setState({
        ...this.state,
        error: { title: "Maximum of 20 character is required" },
      });
      return;
    }

    if (post.trim().length === 0) {
      this.setState({
        ...this.state,
        error: { post: "Post is required" },
      });
      return;
    }

    const content = {
      title,
      post,
      date,
    };
    const token = JSON.parse(localStorage.getItem("jwt-token"));
    const header = {
      headers: {
        "Content-type": "application/json",
      },
    };
    header.headers["Authorization"] = token;
    axios
      .post("/post", content, header)
      .then((post) => {
        this.setState({
          ...this.state,
          title: "",
          post: "",
          error: {},
          success: true,
          isLoading: false,
          contents: [post.data, ...this.state.contents],
        });
        if (this.state.success) {
          setTimeout(
            () => this.setState({ ...this.state, success: false }),
            3000
          );
        }
      })

      .catch((err) => {
        console.log(err.response.data);
        this.setState({ ...this.state, success: false, isLoading: false });
      });
  }

  /////////////////////////////////
  ///CODE FOR RECEIVING USER INPUTS
  onChangeInput(e) {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(e.target.value);
  }

  ////////////////////////////////////
  //////DELETE POST CONTENTS
  deleteHandled(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const token = JSON.parse(localStorage.getItem("jwt-token"));

      const header = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if (token) header.headers["Authorization"] = token;
      const userId = { id };

      axios
        .post("/post/del", userId, header)
        .then((post) => {
          if (post.data.msg.toString() === "1") {
            const contents = this.state.contents.filter(
              (content) => content._id !== id
            );
            this.setState({ ...this.state, contents: [...contents] });
          }
        })
        .catch((err) => console.log(err.response.data));
    }
  }

  editHandle = (id) => {
    //console.log(id);
  };

  /////////////////////////////////////
  //////CODE TO RELOAD EDITED POSTS
  updatedItem = () => {
    axios
      .get("/post")
      .then((posts) =>
        this.setState({ ...this.state, contents: [...posts.data] })
      )
      .catch((err) => console.log(err.response.data));
  };

  //componentDidUpdate(prevProps, prevState) {}

  ///////
  /////////////////////////
  ////////////////
  ////////RENDER CONTENTS/////////////
  ///////////////////////////
  render() {
    const myStyle = { background: "#eee", paddingTop: "10px" };
    const titleClass = this.state.error.title
      ? "form-control is-invalid"
      : "form-control";
    const postClass = this.state.error.post
      ? "form-control is-invalid"
      : "form-control";

    const display = this.state.isMounting ? (
      <div className="col-12 text-center">
        <img src={loader} alt="Loading..." />
      </div>
    ) : (
      <Contents
        items={this.state.contents}
        editHandle={(id) => this.editHandle(id)}
        deleteHandle={(id) => this.deleteHandled(id)}
        updatedItem={() => this.updatedItem()}
      />
    );

    return (
      <div className="col-md-12" style={myStyle}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3 className="text-info text-center my-3">
              PUBLISH NEW CONTENT TODAY...
            </h3>
            <form onSubmit={this.onSubmitPost}>
              <div className="form-group">
                {this.state.error.title && (
                  <label className="text-center" style={{ color: "red" }}>
                    {this.state.error.title}**
                  </label>
                )}

                {this.state.error.post && (
                  <label className="text-center" style={{ color: "red" }}>
                    {this.state.error.post}**
                  </label>
                )}
                {this.state.success && (
                  <div className="card bg-info text-white mb-1">
                    <div className="card-body py-1">
                      <i className="fas fa fa-check-circle"></i> Posted
                      Success!!
                    </div>
                  </div>
                )}

                <input
                  type="text"
                  name="title"
                  autoComplete="off"
                  value={this.state.title}
                  onChange={this.onChangeInput}
                  className={titleClass}
                  placeholder="Enter Title..."
                />
              </div>
              <div className="form-group">
                <textarea
                  className={postClass}
                  placeholder="Enter new post..."
                  rows="5"
                  value={this.state.post}
                  onChange={this.onChangeInput}
                  name="post"
                ></textarea>
              </div>
              <button className="btn btn-lg btn-info" type="submit">
                {this.state.isLoading ? (
                  <i className="fas fa fa-spin fa-spinner"></i>
                ) : (
                  <i className="fas fa fa-plus"></i>
                )}{" "}
                Post New Item
              </button>
            </form>
          </div>
        </div>

        {
          //Display of post contents below
        }
        <div className="row my-5">
          <div className="col-md-12">
            <hr />
          </div>
          {display}
        </div>
      </div>
    );
  }
}
export default withRouter(Dashboard);
