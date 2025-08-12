import { Input, Button, Space } from "antd";

export const InputTask = ({ task, setTask, addTask }) => {
  const handleChange = (event) => {
    setTask(event.target.value);
  };
  const handleKeyDown = (event) => {
    event.key === "Enter" && addTask();
  };
  return (
    <div>
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
    </div>
  );
};
