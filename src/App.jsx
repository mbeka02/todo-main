import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { nanoid } from "nanoid";

import Navbar from "./Components/Navbar";
import Items from "./Components/Items";
import Controls from "./Components/Controls";
import "./App.css";

function App() {
  //STATES
  const [lightMode, setLightMode] = useState(true);
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  );
  const [activetodos, setActiveTodos] = useState([]);
  const [completedtodos, setCompletedtodos] = useState([]);
  const [choice, setChoice] = useState("all");
  //Variable that selects the state array to be mapped.
  let selector;
  if (choice === "all") {
    selector = todos;
  }
  if (choice === "active") {
    selector = activetodos;
  }
  if (choice === "completed") {
    selector = completedtodos;
  }
  //DarkMode/LightMode toggle
  function toggle() {
    setLightMode((prev) => !prev);
  }
  //Removes item from array
  function deleteItem(ItemId) {
    setTodos((arr) => arr.filter((item) => item.id !== ItemId));
  }
  //Changes isComplete property in the individual object
  function completeItem(ItemId) {
    setTodos((arr) =>
      arr.map((item) =>
        item.id === ItemId ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  }
  //Default isComplete value is false

  //Shows active tasks
  function findActive() {
    setChoice("active");
    const active = todos.filter((item) => !item.isComplete);
    setActiveTodos(active);
  }

  //Shows completed tasks
  function findComplete() {
    setChoice("completed");
    const completed = todos.filter((item) => item.isComplete);
    setCompletedtodos(completed);
  }
  //Shows all tasks
  function findAll() {
    setChoice("all");
    const all = [...todos];
    setTodos(all);
  }
  //Removes completed items from array
  function clearCompleted() {
    setTodos((arr) => arr.filter((item) => !item.isComplete));
  }
  //Saves current state in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  //Styling
  const style = {
    backgroundColor: lightMode ? "hsl(0 0% 100%)" : "hsl(235, 24%, 19%)",
  };
  //Generating instances of the component
  const renderTodos = selector.map(({ text, id, isComplete }) => {
    return (
      <div key={id}>
        <Items
          id={id}
          text={text}
          complete={isComplete}
          delete={deleteItem}
          completed={completeItem}
          lightMode={lightMode}
        />
        <hr />
      </div>
    );
  });

  return (
    <div className="App">
      <div className="wrapper">
        <Navbar
          toggle={toggle}
          mode={lightMode}
          //on submit prop for the input field in the navbar(that adds the input value to state)
          onSub={(text) =>
            setTodos([{ text, isComplete: false, id: nanoid() }, ...todos])
          }
        />
      </div>

      <style>{`body{background-color:${
        lightMode ? "white" : "hsl(235, 21%, 11%)"
      }`}</style>

      <div className="container--list" style={style}>
        {renderTodos}
        {todos.length > 0 && (
          <Controls
            findAll={findAll}
            findActive={findActive}
            findComplete={findComplete}
            clear={clearCompleted}
            count={selector.length}
            choice={choice}
          />
        )}
      </div>
    </div>
  );
}

export default App;
