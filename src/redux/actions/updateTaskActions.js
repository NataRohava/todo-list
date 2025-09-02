export const updateTask = (id, value) => {
  return {
    type: "updateTask",
    payload: { id, value },
  };
};
