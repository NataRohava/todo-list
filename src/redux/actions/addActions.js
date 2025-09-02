export const add = (task) => {
  return {
    type: "add",
    payload: task,
  };
};
