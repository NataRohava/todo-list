import { Header } from "./Header";
import { EditTaskForm } from "./EditTaskForm";
import { Input, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { change } from "./redux/actions/changeActions";
import { clearInputTask } from "./redux/actions/clearInputTaskActions";
import { add } from "./redux/actions/addActions";
import { updateTask } from "./redux/actions/updateTaskActions";

import "./App.css";

function App() {
  const list = useSelector((store) => store.list.tasks);
  const task = useSelector((store) => store.task.newTaskText);

  const dispatch = useDispatch();

  const [editIdTask, setEditIdTask] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");

  const addTask = () => {
    if (task.trim()) {
      dispatch(add(task));
      dispatch(clearInputTask());
    }
  };
  const handleChange = (event) => {
    dispatch(change(event.target.value));
  };
  const editTask = (id) => {
    setEditIdTask(id);
    const taskToEdit = list.find((item) => item.id === id);
    if (taskToEdit) {
      setEditTaskValue(taskToEdit.title);
    }
  };
  const handleInputChange = (event) => {
    setEditTaskValue(event.target.value);
  };
  const handleEditKeyDown = (event, id) => {
    event.key === "Enter" && handleUpdateClick(id);
  };
  const handleUpdateClick = (id) => {
    dispatch(updateTask(id, editTaskValue));
    setEditIdTask(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addTask();
  };
  return (
    <Space direction="vertical" size="middle">
      <Header />
      <form onSubmit={handleSubmit}>
        <Space.Compact size="large" style={{ width: "500px" }}>
          <Input
            placeholder="What is the task today?"
            value={task}
            onChange={handleChange}
          />
          <Button
            type="submit"
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
      </form>
      <EditTaskForm
        handleInputChange={handleInputChange}
        handleUpdateClick={handleUpdateClick}
        handleEditKeyDown={handleEditKeyDown}
        editTaskValue={editTaskValue}
        editIdTask={editIdTask}
        editTask={editTask}
      />
    </Space>
  );
}
export default App;
