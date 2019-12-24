import React, { Component } from "react";
import Snake from "./Snake";
import Food from "./Food";

// function to generate a new reandom food coordinates
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0]
  ]
};
class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    // when the button is press
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfColapsed();
    this.checkIfEat();
  }

  onkeydown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
    }
  };

  // function to move the snake
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    // input the head in the dots array
    dots.push(head);
    // to remove the tail
    dots.shift();
    this.setState({
      snakeDots: dots
    });
  };

  // function to check if snake are in of the borders
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  // function to end the game
  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  //
  checkIfColapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.onGameOver();
      }
    });
  }

  // function to check if eat the food
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  // to enlarge the snake
  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    // add a new part in the tail
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    });
  }

  // function to increase the speed
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed + 1000
      });
    }
  }

  render() {
    return (
      <div className="game-area">
        {/* <div className="snake-dot" style={{ top: 0, left: 0 }}></div>
        <div className="snake-dot" style={{ top: 0, left: "2%" }}></div>
        <div className="snake-dot" style={{ top: 0, left: "4%" }}></div> */}
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;
