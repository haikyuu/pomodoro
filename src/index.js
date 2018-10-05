import "./style";
import { Component, render } from "preact";
import { Result } from "./result";

const SEARCH = "//api.github.com/search/repositories";
const WORK_TIME = 1500;
const BREAK_TIME = 300;
export default class App extends Component {
  state = {
    paused: true,
    type: "WORK",
    elapsedTime: WORK_TIME /*25 minutes*/
  };
  onStart = () => {
    this.timer = setInterval(() => {
      if (this.state.elapsedTime === 0) {
        this.setState({
          paused: true,
          type: this.state.type === "BREAK" ? "WORK" : "BREAK",
          elapsedTime: this.state.type === "BREAK" ? WORK_TIME : BREAK_TIME
        });
        return clearInterval(this.timer);
      }
      console.log(this.state.elapsedTime);
      this.setState({ elapsedTime: this.state.elapsedTime - 1 });
    }, 1000);
    this.setState({ paused: false });
  };
  render(
    props,
    { paused, type = "WORK", elapsedTime = WORK_TIME /*25 minutes*/ }
  ) {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <span>{`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</span>
        <button disabled={!paused} onClick={this.onStart}>
          Start
        </button>
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
