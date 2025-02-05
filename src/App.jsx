import { useEffect, useState } from "react";
import "./App.scss";
import chek from "../src/assets/IMG/chek.png";
import plus from "../src/assets/IMG/plus.png";
import uncheked from "../src/assets/IMG/uncheked.png";
import removeimg from "../src/assets/IMG/remove.png";
function App() {
  const [Added, setAdded] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const today = new Date();
  const weekday = today.toLocaleString("en-US", { weekday: "short" });
  const dayOfMonth = today.getDate();
  let hours = today.getHours();
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  useEffect(() => {
    const savedTasks = localStorage.getItem("added");
    if (savedTasks) {
      setAdded(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
      localStorage.setItem("added", JSON.stringify(Added));
  });
  hours = hours % 12;
  hours = hours ? hours : 12;
  const createDiv = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const NewDiv = {
      id: Date.now(),
      text: inputValue,
      time: `Today at ${hours}:${minutes} ${ampm}`,
      checked: true,
    };
    setAdded([...Added, NewDiv]);
    setInputValue("");
  };
  const Ischeked = (id) => {
    setAdded(
      Added.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };
  const remove = (id) => {
    setAdded((Div) => Div.filter((task) => task.id !== id));
  };
  return (
    <>
      <div className="todo">
        <p>Todo</p>
      </div>

      <div id="container">
        <div id="Box">
          <div className="img">
            <p className="day">
              {weekday} {dayOfMonth}
            </p>
            <p className="time">
              {hours}:{minutes} {ampm}
            </p>
          </div>

          <div className="info">
            <form id="form">
              <div className="top">
                <div className="search">
                  <img src={chek} alt="" />
                  <input
                    id="taskInput"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    placeholder="Note"
                    type="text"
                  />
                </div>
                <button onClick={createDiv}>
                  <img src={plus} alt="" />
                </button>
              </div>
            </form>

            <div className="damatebulebi">
              {Added.map((task) => (
                <div key={task.id} className="added">
                  <div className="informatrion">
                    <p className="main">{task.text}</p>
                    <p className="timee">
                      Today at {hours}:{minutes} {ampm}
                    </p>
                  </div>
                  <div className="rame">
                    <img
                      className="ADD"
                      onClick={() => Ischeked(task.id)}
                      src={task.checked ? chek : uncheked}
                      alt="checkbox"
                    />
                    <img
                      className="Remove"
                      onClick={() => remove(task.id)}
                      src={removeimg}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
