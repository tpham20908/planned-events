const router = require("express").Router();
const db = require("../db");

router.route("/").get((req, res) => {
  db.collection("users")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      const users = [];
      data.forEach(doc => {
        users.push({
          userId: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt
        });
      });

      return res.json(users);
    })
    .catch(err => console.error(err));
});

router.route("/add").post((req, res) => {
  const newUser = {
    name: req.body.name,
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

module.exports = router;
