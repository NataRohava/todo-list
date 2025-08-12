import { DeleteTask } from "./DeleteTask";
import { EditTask } from "./EditTask";
import { Button, Space } from "antd";

export const CrossOutTask = ({
  handleCrossOutTask,
  editTask,
  deleteTask,
  taskId,
  completed,
  title,
}) => {
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#e9d1af",
          borderColor: "#ccb188",
          width: "100%",
          height: "40px",
          borderRadius: "10px",
          boxSizing: "border-box",
          padding: "0 15px",
          fontSize: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => handleCrossOutTask(taskId)}
      >
        <span
          style={{
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {title}
        </span>
        <Space>
          <EditTask editTask={editTask} taskId={taskId} />
          <DeleteTask deleteTask={deleteTask} taskId={taskId} />
        </Space>
      </Button>
    </div>
  );
};
