import { Button, Input, Space } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "./List";
import { fetchUpdateTask } from "./redux/listSlice";
import { selectTasks } from "./redux/listSlice";

export const EditTaskForm = () => {
  const [editTaskValue, setEditTaskValue] = useState("");
  const [editIdTask, setEditIdTask] = useState(null);

  const dispatch = useDispatch();
  const list = useSelector(selectTasks);
  const editTask = (id) => {
    setEditIdTask(id);

    const taskToEdit = list.find((item) => item.id === id);
    if (taskToEdit) {
      setEditTaskValue(taskToEdit.title);
    }
  };

  const handleInputChange = (event) => {
    setEditTaskValue(event.target.value);
  };

  const handleEditKeyDown = (event, id) => {
    event.key === "Enter" && handleUpdateClick(id);
  };

  const handleUpdateClick = (id) => {
    if (editTaskValue.trim() === "") {
      alert("Задача не может быть пустой!");
      return;
    }
    dispatch(fetchUpdateTask({ id: id, title: editTaskValue }));
    setEditIdTask(null);
  };
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "500px", marginTop: "30px" }}
    >
      {list.map((item) => (
        <div key={item.id} id={item.id}>
          {editIdTask === item.id ? (
            <Space.Compact size="large" style={{ width: "500px" }}>
              <Input
                value={editTaskValue}
                onChange={handleInputChange}
                onKeyDown={(event) => handleEditKeyDown(event, item.id)}
                autoFocus
              />
              <Button
                style={{
                  backgroundColor: "#e9d1af",
                  borderColor: "#ccb188",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                onClick={() => handleUpdateClick(item.id)}
              >
                Update
              </Button>
            </Space.Compact>
          ) : (
            <List
              editTask={editTask}
              taskId={item.id}
              completed={item.isCompleted}
              title={item.title}
            />
          )}
        </div>
      ))}
    </Space>
  );
};
