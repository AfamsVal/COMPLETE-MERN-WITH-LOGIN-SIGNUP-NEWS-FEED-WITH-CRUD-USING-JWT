import React, { Component } from "react";
import EditModal from "./EditModal";

class Contents extends Component {
  render() {
    //COMPONENT MAPPING GOES HERE/////
    /////////////////////////////////////

    const contents = this.props.items.map((content) => (
      <div key={content._id} className="col-md-4 mt-3">
        <div className="card bg-info text-white">
          <div className="card-header">
            {content.title}
            <i
              onClick={this.props.deleteHandle.bind(this, content._id)}
              className="fas fa fa-times-circle text-white ml-2"
              style={{ float: "right", cursor: "pointer", fontSize: "20px" }}
            ></i>

            <EditModal
              editHandle={this.props.editHandle}
              content={content}
              updatedItem={this.props.updatedItem}
              buttonLabel="Edit Content"
              className=""
            />
          </div>
          <div className="card-body">{content.post}</div>
          <div className="card-footer">
            Posted:{" "}
            {`${new Date(parseInt(content.date)).getDate()}-${
              new Date(parseInt(content.date)).getMonth() + 1
            }-${new Date(parseInt(content.date)).getUTCFullYear()}`}
          </div>
        </div>
      </div>
    ));
    return contents;
  }
}

export default Contents;
