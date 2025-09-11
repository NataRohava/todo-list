export const listActions = {
  addTaskAC(task) {
    return {
      type: "add",
      payload: task,
    };
  },

  deleteTaskAC(id) {
    return {
      type: "delete",
      payload: id,
    };
  },

  crossOutTaskAC(id) {
    return {
      type: "crossOut",
      payload: id,
    };
  },

  updateTaskAC(id, value) {
    return {
      type: "updateTask",
      payload: { id, value },
    };
  },
};
