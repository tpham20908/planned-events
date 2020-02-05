const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();
const db = admin.firestore();
const app = express();

app.get("/users", (req, res) => {
  db.collection("users")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      const users = [];
      data.forEach(doc => {
        users.push({
          userId: doc.id,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname,
          createdAt: doc.data().createdAt
        });
      });

      return res.json(users);
    })
    .catch(err => console.error(err));
});

app.post("/user", (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    createdAt: new Date().toISOString()
  };

  db.collection("users")
    .add(newUser)
    .then(doc => {
      res.json({ message: `User ${doc.id} created successfully!` });
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong!" });
      console.log(err);
    });
});

exports.api = functions.https.onRequest(app);
