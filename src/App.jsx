import { useState, useEffect } from "react";
import { Header } from "./Header";
import { InputTask } from "./InputTask";
import { TasksCounter } from "./TasksCounter";
import { ClearCompletedTasks } from "./ClearCompletedTasks";
import { api } from "./api";
import { List } from "./List";
import { Space } from "antd";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [editIdTask, setEditIdTask] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    try {
      const response = await api.get("/todos");
      setList(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  const addNewTask = async (newTask) => {
    try {
      const response = await api.post("/todos", newTask);
      setList((prevList) => [...prevList, response.data]);
    } catch (error) {
      console.error("Ошибка при добавлении данных:", error);
    }
  };
  const newTaskData = {
    title: task,
  };
  const addTask = () => {
    addNewTask(newTaskData);
    setTask("");
  };

  const completeTask = async (taskId, completedTask) => {
    try {
      const response = await api.patch(
        `/todos/${taskId}/isCompleted`,
        completedTask
      );
    } catch (error) {
      console.error("Ошибка при выполнении данных:", error);
    }
  };
  const editTask = (id) => {
    setEditIdTask(id);
    setEditTaskValue(list[id]);
  };
  const handleInputChange = (event) => {
    setEditTaskValue(event.target.value);
  };
  const handleUpdateClick = (id) => {
    if (editTaskValue.trim()) {
      const updatedList = list.map((item) =>
        item.id === id ? { ...item, title: editTaskValue } : item
      );
      setList(updatedList);
      setEditIdTask(null);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      setList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleCrossOutTask = (id) => {
    const completedTaskData = setList((prevList) =>
      list.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
    completeTask(id, completedTaskData);
  };

  return (
    <Space direction="vertical" size="middle">
      <Header />
      <InputTask task={task} setTask={setTask} addTask={addTask} />
      <List
        list={list}
        deleteTask={deleteTask}
        editTask={editTask}
        editIdTask={editIdTask}
        editTaskValue={editTaskValue}
        handleInputChange={handleInputChange}
        handleUpdateClick={handleUpdateClick}
        handleCrossOutTask={handleCrossOutTask}
      />
      <TasksCounter list={list} />
      <ClearCompletedTasks
        list={list}
        setList={setList}
        loading={loading}
        setLoading={setLoading}
      />
    </Space>
  );
}
export default App;
