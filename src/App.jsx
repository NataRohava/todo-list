import { Input, Button, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { EditTaskForm } from "./EditTaskForm";
import { Header } from "./Header";
import { addTask } from "./redux/listSlice";
import "./App.css";

function App() {
  const [addTaskValue, setAddTaskValue] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (addTaskValue.trim()) {
      dispatch(addTask(addTaskValue));
      setAddTaskValue("");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    handleAddTask();
  };
  return (
    <Space direction="vertical" size="middle">
      <Header />
      <form onSubmit={handleSubmit}>
        <Space.Compact size="large" style={{ width: "500px" }}>
          <Input
            placeholder="What is the task today?"
            value={addTaskValue}
            onChange={(event) => setAddTaskValue(event.target.value)}
          />
          <Button
            type="submit"
            style={{
              backgroundColor: "#e9d1af",
              borderColor: "#ccb188",
              fontSize: "18px",
              fontWeight: "500",
            }}
            onClick={handleAddTask}
          >
            Add task
          </Button>
        </Space.Compact>
      </form>
      <EditTaskForm />
    </Space>
  );
}
export default App;
