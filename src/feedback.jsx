import React from "react";

import $ from "jquery";
import Nav from "./nav";
// import { Link } from 'react-router-dom';
class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      feedback: "",
    };
  }

  getTheInfo(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.feedback);
  }
  giveFeedback() {
    $.ajax({
      method: "POST",
      url: "http://localhost:7000/feedback",
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

  getFeedback(data) {
    $.ajax({
      method: "GET",
      url: "http://localhost:7000/feedback",
      contentType: "application/json",
      success: function (data) {
        console.log("success");
        this.setState({ comment: data });
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  }
  render() {
    return (
      <div>
        <Nav />
        <input
          name="feedback"
          type="text"
          placeholder="write a comment"
          onChange={this.getTheInfo.bind(this)}
        />
        <button onClick={this.giveFeedback.bind(this)}>add comment</button>
      </div>
    );
  }
}
export default Feedback;
