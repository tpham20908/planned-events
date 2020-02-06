const router = require("express").Router();
const db = require("../db");

router.route("/").get((req, res) => {
  db.collection("groups")
    .orderBy("createdAt", "desc")
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

router.route("/:id").get((req, res) => {
  db.collection("groups")
    .doc(`${req.params.id}`)
    .get()
    .then(doc => res.json(doc.data()))
    .catch(err => res.status(400).json({ error: err }));
});

router.route("/:id").delete((req, res) => {
  db.collection("groups")
    .doc(`${req.params.id}`)
    .delete()
    .then(() => res.json({ message: `Group ${req.params.id} deleted.` }))
    .catch(err => res.status(400).json({ error: err }));
});

router.route("/update/:id").post((req, res) => {
  const groupId = req.params.id;
  const newName = req.body.name;

  db.collection("groups")
    .doc(`${groupId}`)
    .update({
      name: newName
    })
    .then(() => res.json({ message: `Group ${req.params.id} updated!` }))
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;
