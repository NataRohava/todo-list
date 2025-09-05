import { Input, Button, Space } from "antd";
import { List } from "./List";
import { useSelector } from "react-redux";

export const EditTaskForm = ({
  handleInputChange,
  handleUpdateClick,
  handleEditKeyDown,
  editTaskValue,
  editIdTask,
  editTask,
}) => {
  const list = useSelector((store) => store.list.tasks);
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
