import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import axios from "axios";

const EditModal = (props) => {
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState({ title: "", post: "" });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggle = () => {
    props.editHandle(props.content._id);
    setPosts({
      ...posts,
      title: props.content.title,
      post: props.content.post,
    });
    handleShow();
  };

  //componentDidUpdate(prevProps, prevState) {}

  ///////////////////////////////////////
  ///CODE FOR RECEIVING USER INPUTS
  const onEditInput = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
  };

  ////////////////////////////////////
  /////CODE FOR SUBMITING EDITED POST
  const onSubmitEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    const id = props.content._id;
    const { title, post } = posts;
    const editedPost = {
      id,
      title,
      post,
    };
    if (title.trim().length === 0)
      return setError({ title: "Title is required" });

    if (post.trim().length === 0) return setError({ post: "Post is required" });

    const token = JSON.parse(localStorage.getItem("jwt-token"));
    const header = {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    };
    axios
      .patch("/post", editedPost, header)
      .then((post) => {
        handleClose();
        props.updatedItem();
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err.response.data);
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <i
        onClick={toggle}
        className="fas fa fa-pencil-square text-white"
        style={{ float: "right", cursor: "pointer", fontSize: "20px" }}
      ></i>
      <Modal open={show} onClose={handleClose} little>
        <div className="row">
          <div className="col-12 mx-auto">
            <h4 className="text-info mt-3 text-info">
              Kindly Edit and save change now...
            </h4>
            {error.title && (
              <p className="text-danger my-0 text-center">{error.title}</p>
            )}
            {error.post && (
              <p className="text-danger my-0 text-center">{error.post}</p>
            )}
            <form onSubmit={onSubmitEdit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={posts.title}
                  onChange={onEditInput}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter new post..."
                  rows="5"
                  name="post"
                  value={posts.post}
                  onChange={onEditInput}
                ></textarea>
              </div>
              <button className="btn btn-info" type="submit">
                {isLoading ? (
                  <i className="fas fa fa-spin fa-spinner"></i>
                ) : (
                  <i className="fas fa fa-pencil-square text-white"></i>
                )}{" "}
                Update Now
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EditModal;
