import { DeleteOutlined } from "@ant-design/icons";

export const DeleteTask = ({ deleteTask, taskId }) => {
  return (
    <div>
      <DeleteOutlined
        style={{ cursor: "pointer" }}
        onClick={(event) => {
          event.stopPropagation();
          deleteTask(taskId);
        }}
      />
    </div>
  );
};
