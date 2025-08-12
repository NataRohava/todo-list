export const TasksCounter = ({ list }) => {
  const tasksLeft = list.filter((task) => !task.isCompleted).length;
  return <p style={{ fontSize: "23px" }}>Tasks left 📝 : {tasksLeft}</p>;
};
