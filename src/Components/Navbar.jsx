import { useState } from "react";
import darkToggle from "../images/icon-moon.svg";
import lightToggle from "../images/icon-sun.svg";
import darkBackground from "../images/bg-desktop-dark.jpg";
import lightBackground from "../images/bg-desktop-light.jpg";

export default function Navbar(props) {
  const useInputVal = (initialVal) => {
    const [value, setValue] = useState(initialVal);
    return {
      value,
      onChange: (e) => setValue(e.target.value),
    };
  };
  //STYLING
  const modeImage = {
    backgroundImage: props.mode
      ? `url(${lightBackground})`
      : `url(${darkBackground})`,
  };
  const Color = {
    backgroundColor: props.mode ? "hsl(0 0% 100%)" : "hsl(235, 24%, 19%)",
    color: props.mode ? "black" : "hsl(236, 33%, 92%)",
  };

  const text = useInputVal(" ");

  return (
    <nav className="navbar" style={modeImage}>
      <div className="container">
        <div className="container--top">
          <h1 className="container--title">TODO</h1>
          <img
            className="toggle"
            src={props.mode ? darkToggle : lightToggle}
            alt="toggle"
            onClick={props.toggle}
          ></img>
        </div>

        <form
          className="addToList"
          style={Color}
          onSubmit={(e) => {
            e.preventDefault();
            props.onSub(text.value);
          }}
        >
          <button className="circular-btn"></button>
          <input
            className="addToList--input"
            placeholder="Create a new todo"
            style={Color}
            {...text}
          ></input>
        </form>
      </div>
    </nav>
  );
}
