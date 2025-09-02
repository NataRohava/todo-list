import { deleteTask } from "./redux/actions/deleteTaskActions";
import { useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

export const DeleteTask = ({ taskId }) => {
  const dispatch = useDispatch();
  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };
  return (
    <div>
      <DeleteOutlined
        style={{ cursor: "pointer" }}
        onClick={(event) => {
          event.stopPropagation();
          handleDeleteTask(taskId);
        }}
      />
    </div>
  );
};
