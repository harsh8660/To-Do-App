const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello hoq");
});
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactnative",
});
const Table = "tasks";
const TableName = "users";

app.post("/UserReg", (req, res) => {
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Password = req.body.Password;
  const Age = req.body.Age;
  const Mobile = req.body.Mobile;
  console.log(Name + "  " + Age);
  const Query = `INSERT INTO ${TableName}(Name,Email,Password,Age,Mobile) VALUES (?,?,?,?,?)`;
  db.query(Query, [Name, Email, Password, Age, Mobile], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/CheckLogin", (req, res) => {
  console.log("kk");
  const UserName = req.body.UserName;
  const Password = req.body.Password;
  console.log(UserName + "  " + Password);
  const Query = `SELECT * FROM ${TableName} WHERE Email=? AND Password=?`;
  db.query(Query, [UserName, Password], (err, result) => {
    if (err) res.send({ err: err });

    if (result.length > 0){ console.log(result)
      res.send(result);}
    else res.send({ message: "Wrong UserName/Password" });
  });
});


app.post("/getTask", (req, res) => {
    const UserId = req.body.Id;
    console.log(UserId)
    const Query = `SELECT * FROM ${Table} WHERE userid=?`;
    db.query(Query, UserId, (err, result) => {
      if (err) res.send({ err: err });
      res.send(result);
    });
  });

app.post("/getData", (req, res) => {
  const Id = req.body.Id;
  console.log(Id);
  const Query = `SELECT * FROM ${TableName} WHERE userid=?`;
  db.query(Query, Id, (err, result) => {
    if (err) res.send({ err: err });
    else res.send({ user: result });
  });
});

app.post("/UploadTask", (req, res) => {
  const Task = req.body.task;
  
  const UserId = req.body.Id;
  console.log(UserId);
  const Query = `INSERT INTO ${Table}(task,userid) VALUES(?,?)`;
  db.query(Query, [Task, UserId], (err, result) => {
    if (err) res.send(err);

    res.send(result);
  });
});

app.delete('/DeleteTask/:id',(req,res)=>{
  const id=req.params.id;
  const Query=`DELETE  FROM ${Table} WHERE taskid=? `
  db.query(Query,id,(err,result)=>{
    if(err)
    res.send({err:err})
    else
    res.send(result)
  })
})
app.listen(3001, (err) => {
  if (err) console.log(err);
  else console.log("runnint at 3001");
});
