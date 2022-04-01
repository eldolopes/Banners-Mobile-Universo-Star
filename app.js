const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

const db = mysql.createPool({
  connectionLimit: 10,
  host: "bannersmobile.mysql.dbaas.com.br",
  user: "bannersmobile",
  password: "universoStar1",
  database: "bannersmobile",
});

app.get("/", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("SELECT * from banners", (err, rows) => {
      connection.release();

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

app.get("/:id", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "SELECT * from banners WHERE id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.delete("/:id", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "DELETE from banners WHERE id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.send(`Item de ID ${[req.params.id]} removido com sucesso.`);
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.post("/", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const params = req.body;

    connection.query("INSERT into banners SET ?", params, (err, rows) => {
      connection.release();

      if (!err) {
        res.send(`Item de ID ${[params.id]} adiconado com sucesso.`);
      } else {
        console.log(err);
      }
    });
  });
});

app.put("/", (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    const { id, link, name, type } = req.body;

    connection.query(
      "UPDATE banners SET link = ?, name = ?, type = ? WHERE id = ?",
      [link, name, type, id],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.send(`Item de ID ${id} atualizado com sucesso.`);
        } else {
          console.log(err);
        }
      }
    );
  });
});

app.get("/index", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listen on port ${port}`);
});
