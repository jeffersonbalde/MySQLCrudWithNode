import express, { request } from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "full_stack_web"
})


app.listen(8800, () => {
    console.log("Server is working");
})

app.get("/", (req, res) => {
    res.json("Server is working");
})

app.get("/books", (req,res) => {
    const query = "SELECT * FROM Books";
    db.query(query, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

// app.post("/books", (req, res) => {
//     const query = "INSERT INTO Books (title, description, cover) VALUES ('title_postman', 'escription_postman', 'cover_postman')";
//     db.query(query, (err, data) => {
//         if(err) return res.json(err);
//         return res.json(data);
//     })
// })

app.post("/books", (req, res) => {
    const query = "INSERT INTO Books (title, description, cover) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ]
    db.query(query, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Books has been created");
    })
})

app.delete("/book/:id", (req,res) => {
    const bookID = req.params.id;
    const query = "DELETE FROM Books WHERE id = ?";
    
    db.query(query, [bookID], (err,data) => {
        if(err) return res.json(err);
        return res.json("Book has been deleted");
    })
})

app.put("/book/:id", (req,res) => {
    const bookID = req.params.id;
    const query = "UPDATE Books SET title = ?, description = ?, cover = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover
    ]

    db.query(query, [...values, bookID], (err, data) => {
        if(err) return res.json(err);
        return res.json("Books has been updated");
    })
    
})