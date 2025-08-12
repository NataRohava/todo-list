import { FormOutlined } from "@ant-design/icons";

export const EditTask = ({ editTask, taskId }) => {
  return (
    <div>
      <FormOutlined
        style={{ cursor: "pointer" }}
        onClick={(event) => {
          event.stopPropagation();
          editTask(taskId);
        }}
      />
    </div>
  );
};
