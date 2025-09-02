const initialValue = {
  value: [
    { id: crypto.randomUUID(), title: "Купить молоко", isCompleted: false },
  ],
  editId: null,
  editValue: "",
};

const listReducer = (store = initialValue, action) => {
  switch (action.type) {
    case "add":
      return {
        ...store,
        value: [
          ...store.value,
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
        value: store.value.filter((task) => task.id !== action.payload),
      };
    case "crossOut":
      return {
        ...store,
        value: store.value.map((task) =>
          task.id === action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        ),
      };
    case "edit":
      return { ...store, editId: action.payload };
    case "editTaskValue":
      return { ...store, editValue: action.payload };
    case "updateTask":
      return {
        ...store,
        value: store.value.map((item, index) =>
          item.id === action.payload.id
            ? { ...item, title: action.payload.value }
            : item
        ),
        editId: null,
        editValue: "",
      };
    default:
      return store;
  }
};
export default listReducer;
