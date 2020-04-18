import {ADD_TODO, DELETE_TODO, SELECT_ALL_TODOS, CLEAR_ALL_COMPLETED, RECEIVE_TODOS} from './mutation-types'
import storageUtil from '../utils/storageUtil'

export default {
  addTodo ({commit}, todo) {
    commit(ADD_TODO, {todo})
  },
  deleteTodo ({commit}, index) {
    commit(DELETE_TODO, {index})
  },
  selectAllTodo ({commit}, check) {
    commit(SELECT_ALL_TODOS, {check})
  },
  clearAllCompleted ({commit}) {
    commit(CLEAR_ALL_COMPLETED)
  },
  reqTodos ({commit}) {
    setTimeout(() => {
      const todos1 = storageUtil.readTodos()
      commit(RECEIVE_TODOS, todos1)
    }, 1000)
  }
}
