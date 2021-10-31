<template>
  <div class="todo">
    <h2>todo sample - vue</h2>
    <div class="todo__input">
      <input type="text" v-model="inputVal" />
      <button class="todo__input-button" @click="add">Add</button>
    </div>
    <ul>
      <li v-for="todo in todos" v-bind:key="todo.id">
        <div class="checkbox">
          <input
            :id="todo.id"
            type="checkbox"
            v-model="todo.complete"
            @click="check(todo.id)"
          />
          <label :for="todo.id" />
        </div>
        <span>{{ todo.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

let id = 0;

export default {
  name: "Todo",
  setup() {
    let todos = ref([]);
    let inputVal = ref("");

    const add = () => {
      console.log("add: " + inputVal.value);
      todos.value = [
        ...todos.value,
        {
          id: id++,
          title: inputVal.value,
          complete: false,
        },
      ];
      inputVal.value = ""; // clear input field
    };

    const check = (id) => {
      console.log("check: " + id);
      const todo = todos.value.find((n) => n.id === id);
      if (todo) {
        todo.complete = !todo.complete;
      }
    };

    return {
      todos,
      inputVal,
      add,
      check,
    };
  },
};
</script>

<style scoped>
@import "../css/checkbox.css";

ul {
  padding: 0;
}

li {
  list-style: none;
  display: flex;
  font-size: 14px;
}

li + li {
  padding-top: 8px;
}

.todo__input {
  display: flex;
}

.todo__input input {
  border: 1px solid #d1d5db;
  padding: 6px 8px;
  outline: none;
  border-radius: 0.3em;
}

.todo__input-button {
  color: rgb(44, 62, 80);
  margin-left: 8px;
}
</style>
