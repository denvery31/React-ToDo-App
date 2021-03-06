import React from "react";
import ToDoBlock from "./ToDoBlock";
import "./componentStyles/todoStyle.css";

function ShowToDo(props) {
  return (
    <div className={"toDoZone"}>
      {props.toDoList.length > 0 ? (
        props.toDoList.map((elem) => (
          <ToDoBlock
            key={elem.id}
            params={elem}
            completeChanger={props.completeChanger}
            todoDeleter={props.todoDeleter}
            todoEditer={props.todoEditer}
          />
        ))
      ) : (
        <h1 className={"noToDoBlock"}>No ToDoS!</h1>
      )}
    </div>
  );
}

export default ShowToDo;
