export default {
  totalCount (state) {
    return state.todos.length
  },
  completeCount (state) {
    return state.todos.reduce((preToal, todo) => {
      return preToal + (todo.complete ? 1 : 0)
    })
  },
  isAllComplete (state, getters) {
    return getters.totalCount === getters.completeCount && getters.totalCount > 0
  }
}
