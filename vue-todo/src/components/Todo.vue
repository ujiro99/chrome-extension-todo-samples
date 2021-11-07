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
import { ref, reactive, toRaw, onMounted } from "vue";
import { Storage } from "../storage";

const TODO = "todo";

let id = 0;

export default {
  name: "Todo",
  setup() {
    const todos = reactive([]);
    const inputVal = ref("");

    onMounted(() => {
      chrome.runtime.sendMessage({ popupMounted: true });
      Storage.get(TODO).then((saved) => {
        if (saved) {
          todos.splice(0, 0, ...saved);
          id = saved.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1;
        }
      });
    });

    const add = () => {
      console.log("add: " + inputVal.value);
      todos.push({
        id: id++,
        title: inputVal.value,
        complete: false,
      });
      inputVal.value = ""; // clear input field
      Storage.set(TODO, toRaw(todos));
    };

    const check = (id) => {
      console.log("check: " + id);
      const todo = todos.find((n) => n.id === id);
      if (todo) {
        todo.complete = !todo.complete;
      }
      Storage.set(TODO, toRaw(todos));
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
@import "../../../react-todo/src/checkbox.css";
@import "../../../react-todo/src/todo.css";
</style>
