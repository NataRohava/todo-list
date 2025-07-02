export const withLogger = (WrappedComponent) => {
  return (props) => {
    const handleUpdateTask = (id) => {
      console.log("Задача обновлена");
      props.editTask(id);
    };
    const handleDeleteTask = (id) => {
      console.log("Задача удалена");
      props.deleteTask(id);
    };
    return (
      <WrappedComponent
        {...props}
        editTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
      />
    );
  };
};
