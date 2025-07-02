import { List } from "./List";
import { withLogger } from "./withLogger";
import { Button, Input, Space, Image } from "antd";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editIdTask, setEditIdTask] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");

  const [crossOutIdTask, setCrossOutIdTask] = useState(() => {
    const savedCrossOutTasks = localStorage.getItem("crossOutTasks");
    return savedCrossOutTasks ? JSON.parse(savedCrossOutTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    localStorage.setItem("crossOutTasks", JSON.stringify(crossOutIdTask));
  }, [crossOutIdTask]);

  const addTask = () => {
    if (task.trim()) {
      setList([task, ...list]);
      setTask("");
    }
  };

  const handleChange = (event) => {
    setTask(event.target.value);
  };
  const handleKeyDown = (event) => {
    event.key === "Enter" && addTask();
  };
  const editTask = (id) => {
    setEditIdTask(id);
    setEditTaskValue(list[id]);
  };
  const handleInputChange = (event) => {
    setEditTaskValue(event.target.value);
  };

  const handleUpdateClick = (id) => {
    if (editTaskValue.trim()) {
      const updatedList = list.map((item, index) =>
        index === id ? editTaskValue : item
      );
      setList(updatedList);
      setEditIdTask(null);
    }
  };
  const deleteTask = (id) => {
    setList(list.filter((item, index) => index !== id));
  };
  const handleCrossOutTask = (id) => {
    setCrossOutIdTask((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const LoggedList = withLogger(List);
  return (
    <Space direction="vertical" size="middle">
      <Image src="todo-list.jpg" />
      <h1>Get things done!</h1>
      <Space.Compact size="large" style={{ width: "500px" }}>
        <Input
          placeholder="What is the task today?"
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          style={{
            backgroundColor: "#e9d1af",
            borderColor: "#ccb188",
            fontSize: "18px",
            fontWeight: "500",
          }}
          onClick={addTask}
        >
          Add task
        </Button>
      </Space.Compact>
      <LoggedList
        list={list}
        deleteTask={deleteTask}
        editTask={editTask}
        editIdTask={editIdTask}
        editTaskValue={editTaskValue}
        handleInputChange={handleInputChange}
        handleUpdateClick={handleUpdateClick}
        crossOutIdTask={crossOutIdTask}
        handleCrossOutTask={handleCrossOutTask}
      />
      <p style={{ marginTop: "100px" }}>
        <a>Log out</a>
      </p>
    </Space>
  );
}

export default App;
