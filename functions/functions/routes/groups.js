const router = require("express").Router();
const db = require("../db");

router.route("/").get((req, res) => {
  db.collection("groups")
    .get()
    .then(data => {
      const groups = [];
      data.forEach(doc => {
        groups.push({
          groupId: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt
        });
      });

      return res.json(groups);
    })
    .catch(err => console.error(err));
});

router.route("/add").post((req, res) => {
  const newGroup = {
    name: req.body.name,
    createdAt: new Date().toISOString()
  };

  db.collection("groups")
    .add(newGroup)
    .then(doc => {
      res.json({ message: `Group ${doc.id} created successfully!` });
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong!" });
      console.log(err);
    });
});

module.exports = router;
