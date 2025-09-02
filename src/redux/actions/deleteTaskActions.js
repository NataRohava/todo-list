export const deleteTask = (id) => {
  return {
    type: "delete",
    payload: id,
  };
};
