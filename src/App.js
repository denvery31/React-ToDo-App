import React, { useEffect, useMemo, useState } from "react";
import TopPanel from "./components/Top/TopPanel";
import "./App.css";
import ShowToDo from "./components/ShowToDo";
import { setToDo } from "./Api/ToDoGetApi";

function App() {
  const [toDoList, setToDoList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Newer");

  useEffect(() => {
    setToDo(setToDoList);
  }, []);

  function completeChanger(id) {
    var list = [...toDoList];
    var toDoToChange = list.find((el) => el.id === id);
    toDoToChange.completed = !toDoToChange.completed;
    setToDoList(list);
  }

  function todoDeleter(idToDelete) {
    setToDoList([...toDoList].filter((el) => el.id !== idToDelete));
  }

  function todoAdder(todoToAdd) {
    setToDoList([
      ...toDoList,
      {
        id: Date.now(),
        completed: false,
        ...todoToAdd,
      },
    ]);
  }

  function todoEditer(editedToDo) {
    //delete todoById
    //clearList == listWithout editingTODO
    const clearList = [...toDoList].filter((el) => el.id !== editedToDo.id);

    setToDoList([...clearList, editedToDo]);
  }

  const searchedToDoList = useMemo(() => {
    if (searchQuery) {
      return [...toDoList].filter((el) =>
        el.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    } else {
      return [...toDoList];
    }
  }, [toDoList, searchQuery]);

  const filteredAndSearchedToDoList = useMemo(() => {
    switch (selectedFilter) {
      case "Newer":
        return searchedToDoList.sort((a, b) => b.id - a.id);
      case "Older":
        return searchedToDoList.sort((a, b) => a.id - b.id);
      case "By Name":
        return searchedToDoList.sort((a, b) => a.title.localeCompare(b.title));
      case "Completed":
        return searchedToDoList.sort((a, b) => b.completed - a.completed);
      case "NotCompleted":
        return searchedToDoList.sort((a, b) => a.completed - b.completed);
      default:
        return searchedToDoList;
    }
  }, [searchedToDoList, selectedFilter]);

  return (
    <div className="App">
      <TopPanel
        searchParams={[searchQuery, setSearchQuery]}
        selectParams={[selectedFilter, setSelectedFilter]}
        todoAdder={todoAdder}
      />
      <ShowToDo
        toDoList={filteredAndSearchedToDoList}
        completeChanger={completeChanger}
        todoDeleter={todoDeleter}
        todoEditer={todoEditer}
      />
    </div>
  );
}

export default App;
