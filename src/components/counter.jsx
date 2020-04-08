import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 10.123,
    imgURL: "https://picsum.photos/200",
  };
  styles = { fontSize: 16 };
  render() {
    return (
      <div>
        {/*<img src={this.state.imgURL} alt="" />*/}
        <span style={this.styles} className="badge badge-primary m-2">
          {this.formatCount()}
        </span>
        <button className="btn btn-secondary btn-sm">Increment</button>
      </div>
    );
  }
  formatCount() {
    const { count } = this.state;
    return count === 0 ? <h1>nix</h1> : count;
  }
}

export default Counter;
