import { Input, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { change } from "./redux/actions/changeActions";
import { zero } from "./redux/actions/zeroActions";
import { add } from "./redux/actions/addActions";

export const InputTask = () => {
  const task = useSelector((store) => store.task.value);
  const dispatch = useDispatch();

  const addTask = () => {
    if (task.trim()) {
      dispatch(add(task));
      dispatch(zero());
    }
  };

  const handleChange = (event) => {
    dispatch(change(event.target.value));
  };
  const handleKeyDown = (event) => {
    event.key === "Enter" && addTask();
  };
  return (
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
  );
};
