## VUE Architecture
* Approachable - easy to start
* Versatile - incrementally ecosystem
* Performant - automatically effective re-render

#### Component

Vue component is similar to Angularjs component, it is a DOM sets with scope.

There are three main features:
* template
* scope data (should be initialize)
* watcher

Vue compile template and the directive with scope data to virture DOM,

and watcher both template and scope data update to re-render, and patch dom-diff to DOM.

```
// Create Vue application
const app = Vue.createApp(TodoList);

app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
});
```

#### Component architecture

