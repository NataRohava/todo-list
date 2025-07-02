import { Input, Button, Space } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

export const List = ({
  list,
  deleteTask,
  editTask,
  editIdTask,
  editTaskValue,
  handleInputChange,
  handleUpdateClick,
  crossOutIdTask,
  handleCrossOutTask,
}) => {
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "500px", marginTop: "30px" }}
    >
      {list.map((item, index) => (
        <div key={index} id={index}>
          {editIdTask === index ? (
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
                onClick={() => handleUpdateClick(index)}
              >
                Update
              </Button>
            </Space.Compact>
          ) : (
            <Button
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
              }}
              onClick={() => handleCrossOutTask(index)}
            >
              <span
                style={{
                  textDecoration: crossOutIdTask.includes(index)
                    ? "line-through"
                    : "none",
                }}
              >
                {item}
              </span>
              <Space>
                <FormOutlined
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    editTask(index);
                  }}
                />
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteTask(index);
                  }}
                />
              </Space>
            </Button>
          )}
        </div>
      ))}
    </Space>
  );
};
