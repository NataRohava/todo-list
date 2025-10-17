export const listSelectors = {
  selectTasks: (state) => state.list.tasks,
  selectLoading: (state) => state.list.loading,
  selectError: (state) => state.list.error,
};
