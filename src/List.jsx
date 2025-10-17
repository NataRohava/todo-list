import { Space } from "antd";
import { useDispatch } from "react-redux";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchCrossOutTask, fetchDeleteTask } from "./redux/listSlice";
//import { deleteTask } from "./redux/listSlice";
import { crossOut } from "./redux/listSlice";

export const List = ({ editTask, taskId, title, completed }) => {
  //console.log("List рендерится", { taskId, title, completed });
  const dispatch = useDispatch();

  const handleCrossOutTask = (id, isCompleted) => {
    dispatch(crossOut(id));
    dispatch(fetchCrossOutTask({ id, isCompleted }));
  };

  const handleDeleteTask = (id) => {
    dispatch(fetchDeleteTask(id));
  };
  return (
    <span
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
        cursor: "pointer",
        textDecoration: completed ? "line-through" : "none",
      }}
      onClick={() => handleCrossOutTask(taskId, completed)}
    >
      {title}
      <Space>
        <FormOutlined
          style={{ cursor: "pointer" }}
          onClick={(event) => {
            event.stopPropagation();
            editTask(taskId);
          }}
        />
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteTask(taskId);
          }}
        />
      </Space>
    </span>
  );
};
