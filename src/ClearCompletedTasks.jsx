import { Button, Spin } from "antd";
import { api } from "./api";

export const ClearCompletedTasks = ({ list, loading, setLoading, setList }) => {
  const clearCompletedTasks = async () => {
    setLoading(true);
    try {
      const crossOutTasks = list.filter((item) => item.isCompleted);
      for (const task of crossOutTasks) {
        await api.delete(`/todos/${task.id}`);
      }
      setList((prevList) => prevList.filter((item) => !item.isCompleted));
    } catch (error) {
      console.error("Ошибка при удалении задач", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Button
        style={{
          backgroundColor: "#C0C0C0",
          borderColor: "#ccb188",
          height: "40px",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "500",
        }}
        onClick={clearCompletedTasks}
        disabled={loading}
      >
        Clear completed tasks
      </Button>
      {loading && (
        <Spin tip="Loading..." size="large" style={{ marginLeft: "30px" }} />
      )}
    </div>
  );
};
