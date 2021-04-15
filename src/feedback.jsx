import React from "react";

import $ from "jquery";
import Nav from "./nav";
class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      comment: [{sender:"areen",comment:"htghgh"},{sender:"areeeeen",comment:"hii"}, {sender:"areeeeen",comment:"hii"}]

    };
  }

  getTheInfo(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.feedback);
  }
  giveFeedback() {
    console.log(this.props.id)
    $.ajax({
      method: "POST",
      url: `/feedback/${this.props.id}`,
      data: JSON.stringify({
        feedback: this.state.feedback,
      }),
      contentType: "application/json",
      success: function () {
        console.log("success");
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  }

  getFeedback() {
    var that = this
    console.log(this.props.id)
    $.ajax({
      method: "GET",
      url: `/feedback/${this.props.id}`,
      contentType: "application/json",
      success: function (data) {
        console.log("success");
       that.setState({ comment: data[1] });
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  }

  render() {
    return (
      <div>

        <input
          name="feedback"
          type="text"
          placeholder="write a comment"
          onChange={this.getTheInfo.bind(this)}
        />

        <button onClick={this.giveFeedback.bind(this)}>add comment</button>
        <br/>


   <div className="row">
   <div className="col-sm-8">
   <div className="card">
    <div className="card-body">
    {this.state.comment.map((element) => {

  return <div>
      <h5  className="card-title">username: {element.sender}</h5>

      <p className="card-text">{element.comment}</p>
  </div>

    })}</div>
  </div>

  </div></div>



  </div>


    );
  }
}
export default Feedback;
