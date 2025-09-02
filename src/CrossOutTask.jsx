import { DeleteTask } from "./DeleteTask";
import { EditTask } from "./EditTask";
import { Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { crossOutTask } from "./redux/actions/crossOutTaskActions";

export const CrossOutTask = ({ taskId, title, completed }) => {
  const dispatch = useDispatch();

  const handleCrossOutTask = (id) => {
    dispatch(crossOutTask(id));
  };
  return (
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
        <EditTask taskId={taskId} />
        <DeleteTask taskId={taskId} />
      </Space>
    </Button>
  );
};
