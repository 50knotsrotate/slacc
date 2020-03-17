/* tslint:disable */
import * as React from "react";
import "./App.css";
import io from 'socket.io-client';

class App extends React.Component {
  constructor() {
    super();
    this.socket = io("http://localhost:80");
    this.state = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }

  handleClick = event => {
    const number = event.target.innerText;
    this.socket.emit("click", number);
  };

  styles = () => { 
    return {
      width: "50px",
      height: "50px",
      padding: "25px",
      backgroundColor: `rgb(
      ${Math.random() * 255},
      ${Math.random() * 255},
      ${Math.random() * 255}
    )`,
      textAlign: 'center'
    };
  }
  render() {

    return (
      <div>
        <h1 onClick={e => this.handleClick(e)}>Hello</h1>
      </div>
    )
  }
}

export default App;
