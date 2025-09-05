const initialValue = {
  tasks: [
    { id: crypto.randomUUID(), title: "Купить молоко", isCompleted: false },
  ],
};

const listReducer = (store = initialValue, action) => {
  switch (action.type) {
    case "add":
      return {
        ...store,
        tasks: [
          ...store.tasks,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            isCompleted: false,
          },
        ],
      };
    case "delete":
      return {
        ...store,
        tasks: store.tasks.filter((task) => task.id !== action.payload),
      };
    case "crossOut":
      return {
        ...store,
        tasks: store.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task,
        ),
      };
    case "updateTask":
      return {
        ...store,
        tasks: store.tasks.map((item) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.value }
            : item,
        ),
      };
    default:
      return store;
  }
};
export default listReducer;
