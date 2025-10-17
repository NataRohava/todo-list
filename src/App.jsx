import { Input, Button, Space } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditTaskForm } from "./EditTaskForm";
import { Header } from "./Header";
import { fetchGetTodos, fetchAddTask } from "./redux/listSlice";
import { listSelectors } from "./redux/listSelectors";
import "./App.css";

function App() {
  const loading = useSelector(listSelectors.selectLoading);
  const error = useSelector(listSelectors.selectError);
  const [addTaskValue, setAddTaskValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetTodos());
  }, []);

  const handleAddTask = () => {
    if (addTaskValue.trim()) {
      dispatch(fetchAddTask(addTaskValue));
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
      {loading ? <h1>⏳ Loading ...</h1> : null}
      {error ? <div>Error: {error}</div> : null}
    </Space>
  );
}
export default App;
