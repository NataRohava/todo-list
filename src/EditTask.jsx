import { edit } from "./redux/actions/editIdTaskActions";
import { useDispatch } from "react-redux";
import { FormOutlined } from "@ant-design/icons";

export const EditTask = ({ taskId }) => {
  const dispatch = useDispatch();
  const editTask = (id) => {
    dispatch(edit(id));
  };

  return (
    <FormOutlined
      style={{ cursor: "pointer" }}
      onClick={(event) => {
        event.stopPropagation();
        editTask(taskId);
      }}
    />
  );
};
