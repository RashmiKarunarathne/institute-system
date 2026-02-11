const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "institute_db"
});

db.connect(err=>{
    if(err) throw err;
    console.log("MySQL Connected");
});

/* ================= STUDENTS CRUD ================= */

// CREATE
app.post("/students",(req,res)=>{
    const {name,email,password} = req.body;
    db.query(
        "INSERT INTO students VALUES(NULL,?,?,?)",
        [name,email,password],
        ()=> res.send("Student Added")
    );
});

// READ
app.get("/students",(req,res)=>{
    db.query("SELECT * FROM students",(err,result)=>{
        res.send(result);
    });
});

// UPDATE
app.put("/students/:id",(req,res)=>{
    const {name,email} = req.body;
    db.query(
        "UPDATE students SET name=?, email=? WHERE id=?",
        [name,email,req.params.id],
        ()=> res.send("Updated")
    );
});

// DELETE
app.delete("/students/:id",(req,res)=>{
    db.query(
        "DELETE FROM students WHERE id=?",
        [req.params.id],
        ()=> res.send("Deleted")
    );
});

/* ================= TEACHERS CRUD ================= */

app.post("/teachers",(req,res)=>{
    const {name,subject,photo} = req.body;
    db.query(
        "INSERT INTO teachers VALUES(NULL,?,?,?)",
        [name,subject,photo],
        ()=> res.send("Teacher Added")
    );
});

app.get("/teachers",(req,res)=>{
    db.query("SELECT * FROM teachers",(err,result)=>{
        res.send(result);
    });
});

/* ================= ENROLLMENT CRUD ================= */

app.post("/enroll",(req,res)=>{
    const {student_id,course} = req.body;
    db.query(
        "INSERT INTO enrollments VALUES(NULL,?,?,?)",
        [student_id,course,"Pending"],
        ()=> res.send("Enrolled")
    );
});

app.get("/enroll/:id",(req,res)=>{
    db.query(
        "SELECT * FROM enrollments WHERE student_id=?",
        [req.params.id],
        (err,result)=> res.send(result)
    );
});

app.listen(5000,()=>console.log("Server running"));
