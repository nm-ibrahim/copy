const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "l4sod",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err.message);
    return;
  }

  console.log("Database connected successfully");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

// CRUD operations
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json({ message: "data fetched", results });
  });
});
//post insert data into database
app.post("/api/users", (req, res) => {
  const { id, name, email, age } = req.body;

  if (!id || !name || !email || age === undefined) {
    return res.status(400).json({
      error: "id, name, email, and age are required",
    });
  }

  const query = "INSERT INTO users (id, name, email, age) VALUES (?, ?, ?, ?)";

  db.query(query, [id, name, email, age], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error })                  
    }

    return res.status(200).json({ message: 'data fetched', results })
  });
});
app.get("/api/users/:id", (req, res) => {
  const  id  = req.params.id
  const myQuery = "SELECT * FROM users WHERE id = ?";
  db.query(myQuery,[id],(error,results)=>{
if(error){
    return res.status(500).json({error: error})
} 
  return res.status(200).json({ message: 'data fetched', results })
    
  })
})
app.listen(3000)