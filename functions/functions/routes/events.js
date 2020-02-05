const router = require("express").Router();
const db = require("../db");

router.route("/").get((req, res) => {
  db.collection("events")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      const events = [];
      data.forEach(doc => {
        events.push({
          eventId: doc.id,
          groupName: doc.data().groupName,
          userName: doc.data().userName,
          createdAt: doc.data().createdAt
        });
      });

      return res.json(events);
    })
    .catch(err => console.error(err));
});

router.route("/add").post((req, res) => {
  const newEvent = {
    groupName: req.body.groupName,
    userName: req.body.userName,
    createdAt: new Date().toISOString()
  };

  db.collection("events")
    .add(newEvent)
    .then(doc => {
      res.json({ message: `Event ${doc.id} created successfully!` });
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong!" });
      console.log(err);
    });
});

router.route("/:id").get((req, res) => {
  db.collection("events")
    .doc(`${req.params.id}`)
    .get()
    .then(doc => res.json(doc.data()))
    .catch(err => res.status(400).json({ error: err }));
});

router.route("/:id").delete((req, res) => {
  db.collection("events")
    .doc(`${req.params.id}`)
    .delete()
    .then(() => res.json({ message: `Event ${req.params.id} deleted.` }))
    .catch(err => res.status(400).json({ error: err }));
});

router.route("/update/:id").post((req, res) => {
  db.collection("events")
    .doc(`${req.params.id}`)
    .update({
      groupName: req.body.groupName,
      userName: req.body.userName
    })
    .then(() => res.json({ message: `Event ${req.params.id} updated!` }))
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;
