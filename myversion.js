// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 5000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('content-Type','text/plain');
//     res.end('Hello Node....:)');
// });

// server.listen(port, hostname, ()=> {
//     console.log('server is running....');
// })

//###############################################

// EXPRESS WEB SERVER

const express = require("express");

const hostname = "127.0.0.1";
const port = 5000;

// returns an express application(an instance of express)
const app = express();
app.use(express.json()); //middlewares (telling express to convert to json for us)

let todos = [{ id: 1, task: "call mum", date: "20/08/2020", completed: false }];

//route
// route and function that accepts requests and response
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
  newTodos = [];
  todos.forEach((todo) => {
    if (todo.id != id) {
      newTodos.push(todo);
    }
  });
  todos = newTodos;
  res.status(204).send();
});
//update using postman
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
        todo.task = updated.task;
      }
      if (update.date != undefined) {
        todo.date = update.date;
      }
      if (!todoFound) {
        res.status(400).send("error");
      }
    }
    newTodos.push(todo);
  });
  todos = newTodos;
  res.status(204).send();
});

// ASSIGNMENT; updating using path variables
// app.put("/:id/:task/:completed/:date", (req, res) => {
//   update = [];
//   id = req.params.id;
//   todo = req.body;
//   newtask = req.params.task;
//   newcomplete = req.params.completed;
//   newdate = req.params.date;

//   todos.forEach((todo) => {
//     if (todo.id == id) {
//       todo.task = newtask;
//       todo.completed = newcomplete;
//       todo.date = newdate;
//       update.push(todo);
//     }
//   });
//   res.status(200).send(todos);
// });

app.post("/", (req, res) => {
  todo = req.body;
  todo.id = todos.length + 1;
  todos.push(todo);

  res.status(201).send();
});

app.listen(port, () => {
  console.log("server is running");
});
