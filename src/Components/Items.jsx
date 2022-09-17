import iconDelete from "../images/icon-cross.svg";

export default function Items(props) {
  const style = {
    color: props.lightMode ? "black" : "hsl(236, 33%, 92%)",
  };
  return (
    <div className="todo">
      <div className="todo--container">
        <button
          className={props.complete ? "checked-btn" : "circular-btn"}
          onClick={() => props.completed(props.id)}
        />
        <p
          className={props.complete ? "complete-todo" : "incomplete-todo"}
          style={style}
        >
          {props.text}
        </p>
      </div>
      <img
        className="delete"
        src={iconDelete}
        alt="delete"
        onClick={() => props.delete(props.id)}
      />
    </div>
  );
}
