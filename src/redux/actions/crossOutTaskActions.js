export const crossOutTask = (id) => {
  return {
    type: "crossOut",
    payload: id,
  };
};
