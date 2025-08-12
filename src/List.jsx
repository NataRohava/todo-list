import { CrossOutTask } from "./CrossOutTask";
import { Input, Button, Space } from "antd";

export const List = ({
  list,
  deleteTask,
  editTask,
  editIdTask,
  editTaskValue,
  handleInputChange,
  handleUpdateClick,
  handleCrossOutTask,
}) => {
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "500px", marginTop: "30px" }}
    >
      {list.map((item) => {
        return (
          <div key={item.id} id={item.id}>
            {editIdTask === item.id ? (
              <Space.Compact size="large" style={{ width: "500px" }}>
                <Input
                  value={editTaskValue}
                  onChange={handleInputChange}
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
              <CrossOutTask
                handleCrossOutTask={handleCrossOutTask}
                taskId={item.id}
                completed={item.isCompleted}
                title={item.title}
                editTask={editTask}
                deleteTask={deleteTask}
              />
            )}
          </div>
        );
      })}
    </Space>
  );
};
