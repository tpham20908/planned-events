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

module.exports = router;
