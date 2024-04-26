const express = require("express");
var mysql  = require("mysql");
const cors = require("cors");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  Password:"",
  database:"perntodo"
});

// Connect to MySQL
db.connect(err => {
  if (err) {
      throw err;
  }
  console.log("MySQL connected...");
});
app.post("/todos", (req, res) => {
  const { description } = req.body;
  const query = "INSERT INTO todos (description) VALUES (?)";
  db.query(query, [description], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
      }
      res.status(201).send("Todo added successfully");
  });
});

// Get all todos
app.get("/todos", (req, res) => {
  const query = "SELECT * FROM todos";
  db.query(query, (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
      }
      res.json(results);
  });
});

// Get a todo by ID
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM todos WHERE id = ?";
  db.query(query, [id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
      }
      if (results.length === 0) {
          return res.status(404).send("Todo not found");
      }
      res.json(results[0]);
  });
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;
  const query = "UPDATE todos SET description = ?, completed = ? WHERE id = ?";
  db.query(query, [description, completed, id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
      }
      res.send("Todo updated successfully");
  });
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todos WHERE id = ?";
  db.query(query, [id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Server Error");
      }
      res.send("Todo deleted successfully");
  });
});


app.listen(5000 , ()=>{
    console.log("server has started on port 5000");
});