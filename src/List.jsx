import { Input, Button, Space } from "antd";
import { CrossOutTask } from "./CrossOutTask";
import { useSelector } from "react-redux";

export const List = ({ handleInputChange, handleUpdateClick }) => {
  const list = useSelector((store) => store.list.value);
  const editId = useSelector((store) => store.list.editId);
  const editValue = useSelector((store) => store.list.editValue);
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "500px", marginTop: "30px" }}
    >
      {list.map((item) => (
        <div key={item.id} id={item.id}>
          {editId === item.id ? (
            <Space.Compact size="large" style={{ width: "500px" }}>
              <Input value={editValue} onChange={handleInputChange} autoFocus />
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
