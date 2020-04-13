<template>
  <div class="todo-container">
    <div class="todo-wrap">
<!--      <TodoHeader @addTodo="addTodo"/>-->
      <TodoHeader ref="header"/>
      <TodoList :todos="todos" />
<!--      <todo-footer :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>-->
      <todo-footer >
        <input type="checkbox" v-model="isAllCheck" slot="checkAll"/>
        <span slot="count">已完成{{completeSize}} / 全部 {{todos.length}} </span>
        <button class="btn btn-danger" v-show="completeSize" @click="deleteCompleteTodos" slot="delete">清除已完成任务</button>
      </todo-footer>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import TodoHeader from './components/TodoHeader'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'
import storageUtil from './components/util/storageUtil'

export default {
  data () {
    return {
      // todos: [
      //   {title: '吃饭', complete: false},
      //   {title: '睡觉', complete: true},
      //   {title: 'coding', complete: false}
      // ]
      // todos: JSON.parse(window.localStorage.getItem(TODOS_KEY) || '[]')
      todos: storageUtil.readTodos()
    }
  },
  computed: {
    completeSize () {
      return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
    },
    isAllCheck: {
      get () {
        return this.completeSize === this.todos.length && this.completeSize > 0
      },
      set (value) {
        this.selectAllTodos(value)
      }
    }
  },
  mounted () {
    // this.$on('addTodo', this.addTodo)
    this.$refs.header.$on('addTodo', this.addTodo)

    PubSub.subscribe('deleteTodo', (msg, index) => {
      this.deleteTodo(index)
    })
  },
  methods: {
    addTodo (todo) {
      this.todos.unshift(todo)
    },
    deleteTodo (index) {
      this.todos.splice(index, 1)
    },
    deleteCompleteTodos () {
      this.todos = this.todos.filter(todos => !todos.complete)
    },
    selectAllTodos (check) {
      this.todos.forEach(todo => todo.complete = check)
    }
  },
  watch: {
    todos: {
      deep: true,
      // handler: function (value) {
      //   // window.localStorage.setItem('todos_key', JSON.stringify(value))
      //   storageUtil.saveTodos(value)
      // }
      handler: storageUtil.saveTodos
    }
  },
  components: {
    TodoHeader, TodoList, TodoFooter
  }
}
</script>

<style>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
