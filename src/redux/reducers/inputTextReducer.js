const initialValue = {
  newTaskText: "",
};
const inputTextReducer = (store = initialValue, action) => {
  switch (action.type) {
    case "change":
      return { ...store, newTaskText: action.payload };
    case "zero":
      return { ...store, newTaskText: "" };
    default:
      return store;
  }
};
export default inputTextReducer;
