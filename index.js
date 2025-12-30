import cors from "cors";
import mysql from "mysql";
import express from "express";

const app = express();


app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

const db = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore_db",
});


db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});


app.post("/auth/login", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const q = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(q, [username, password], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      const user = data[0];
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    }
  });
});

app.post("/auth/register", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { username, email, password } = req.body;

  const errors = [];
  if (!username) errors.push("Username is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  db.query(q, [username, email, password], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: "Username or email already exists" });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "User registered successfully",
        id: data.insertId,
      });
    }
  });
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(204).send("No books found");
      }
      return res.status(200).json(data);
    }
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Book ID must be a number" });
  }

  const q = "SELECT * FROM books WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(data[0]);
    }
  });
});

app.get("/books/search/:title", (req, res) => {
  const title = req.params.title;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const q = "SELECT * FROM books WHERE title LIKE ?";

  db.query(q, [`%${title}%`], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
      return res.status(200).json(data);
    }
  });
});


app.post("/books", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { title, price, description } = req.body;

  const errors = [];
  if (!title) {
    errors.push("Title is required");
  }
  if (!price) {
    errors.push("Price is required");
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  const q = "INSERT INTO books (title, price, description) VALUES (?, ?, ?)";

  db.query(q, [title, price, description || ""], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "Book created successfully",
        id: data.insertId,
      });
    }
  });
});


app.put("/books/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { id } = req.params;
  const { title, price, description } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Book ID must be a number" });
  }

  if (!title || !price) {
    return res.status(400).json({ message: "Title and price are required" });
  }

  const q = "UPDATE books SET title = ?, price = ?, description = ? WHERE id = ?";

  db.query(q, [title, price, description || "", id], (err, data) => {
    if (err) {
      if (err.errno === 1062) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book updated successfully" });
    }
  });
});


app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "Book ID must be a number" });
  }

  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json({ message: "Book deleted successfully" });
    }
  });
});


app.post("/contact", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const { name, email, message } = req.body;

  const errors = [];
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!message) errors.push("Message is required");

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  const q = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";

  db.query(q, [name, email, message], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    } else {
      return res.status(201).json({
        message: "Message sent successfully",
        id: data.insertId,
      });
    }
  });
});