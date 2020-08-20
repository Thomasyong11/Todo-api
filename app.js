const express = require("express");

const port = process.env.PORT || 5000;
let todos = [{ id: 1, task: "call mom", date: "20/08/2020", completed: false }];

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json(todos);
});

app.get("/:id", (req, res) => {
  id = req.params.id;

  todos.forEach((todo) => {
    if (todo.id == id) {
      return res.status(200).json(todo);
    }
  });

  res.status(404).json({ error: "todo not found" });
});

app.delete("/:id", (req, res) => {
  id = req.params.id;
  const newTodos = [];

  todos.forEach((todo) => {
    if (todo.id != id) {
      newTodos.push(todo);
    }
  });

  todos = newTodos;

  res.status(204).send();
});

app.post("/", (req, res) => {
  todo = req.body;
  todo.id = todos.length + 1;
  todos.push(todo);

  res.status(201).send();
});

app.put("/:id", (req, res) => {
  const todoID = req.params.id;
  const update = req.body;
  const newTodos = [];
  let todoFound = false;

  todos.forEach((todo) => {
    if (todo.id == todoID) {
      todoFound = true;
      if (update.completed != undefined) {
        todo.completed = update.completed;
      }
      if (update.task != undefined) {
        todo.task = update.task;
      }
      if (update.date != undefined) {
        todo.date = update.date;
      }
    }
    newTodos.push(todo);
  });

  if (!todoFound) {
    res.status(400).send();
  }

  todos = newTodos;

  res.status(204).send();
});

app.listen(port, () => {
  console.log("server is running....");
});
