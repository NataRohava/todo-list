import { Header } from "./Header";
import { List } from "./List";
import { InputTask } from "./InputTask";
import { Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { editTaskValue } from "./redux/actions/editTaskValueActions";
import { updateTask } from "./redux/actions/updateTaskActions";

import "./App.css";

function App() {
  const editValue = useSelector((store) => store.list.editValue);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(editTaskValue(event.target.value));
  };
  const handleUpdateClick = (id) => {
    dispatch(updateTask(id, editValue));
  };

  return (
    <Space direction="vertical" size="middle">
      <Header />
      <InputTask />
      <List
        handleInputChange={handleInputChange}
        handleUpdateClick={handleUpdateClick}
      />
    </Space>
  );
}
export default App;
