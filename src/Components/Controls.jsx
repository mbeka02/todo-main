export default function Controls(props) {
  return (
    <div className="controls">
      <span className="item-count">
        {props.count} item{props.count > 1 && "s"} left
      </span>
      <div className="controls--btns">
        <button
          className={props.choice === "all" ? "active-btn" : "control-btn"}
          onClick={props.findAll}
        >
          All
        </button>
        <button
          className={props.choice === "active" ? "active-btn" : "control-btn"}
          onClick={props.findActive}
        >
          Active
        </button>
        <button
          className={
            props.choice === "completed" ? "active-btn" : "control-btn"
          }
          onClick={props.findComplete}
        >
          Completed
        </button>
      </div>
      <button className="clear-btn" onClick={props.clear}>
        Clear Completed
      </button>
    </div>
  );
}
