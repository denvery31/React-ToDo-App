import React, { useEffect, useState } from "react";
import ToDoMaker from "../popup/LogicBlocks/TodoMaker";
import "./Top.css";

function TopPanel(props) {
  const topRef = React.createRef();

  const [isActiveModal, setIsActiveModal] = useState(false);

  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = props.searchParams;

  const [isFilter, setIsFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = props.selectParams;

  function handleSearchChange() {
    setIsSearch(!isSearch);
    setIsFilter(false);
  }

  function handleFilterChange() {
    setIsFilter(!isFilter);
    setIsSearch(false);
  }

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 35) {
        topRef.current.classList.add("headerWide");
      } else {
        topRef.current.classList.remove("headerWide");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <div ref={topRef} className={`defaultTop header`}>
        <div className="inToDo">
          <h1>ToDo</h1>
          <div className="controlsBlock">
            <div>
              <button
                className="btnAdd"
                onClick={() => setIsActiveModal(true)}
              />
            </div>
            <div
              className={
                isFilter ? "filtterBlock openedBtnFilter" : "filterBlock"
              }
            >
              <button className="btnFilter" onClick={handleFilterChange} />
              {isFilter && (
                <select
                  className="filterSelect"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option>Newer</option>
                  <option>Older</option>
                  <option>By Name</option>
                  <option value="Completed">Completed first</option>
                  <option value="NotCompleted">NotCompleted first</option>
                </select>
              )}
            </div>
            <div
              className={
                isSearch ? "searchBlock openedBtnSearch" : "searchBlock"
              }
            >
              <button className="btnSearch" onClick={handleSearchChange} />
              {isSearch && (
                <input
                  type="text"
                  className="searchInput"
                  placeholder={"Search"}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
              )}
            </div>
            <div>
              <button className="btnAuth" />
            </div>
          </div>
        </div>
      </div>

      <ToDoMaker
        isActiveModal={isActiveModal}
        setIsActiveModal={setIsActiveModal}
        todoAdder={props.todoAdder}
      />
    </>
  );
}

export default TopPanel;
