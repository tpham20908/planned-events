const functions = require("firebase-functions");
const app = require("express")();

const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");
const eventsRouter = require("./routes/events");

app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
app.use("/events", eventsRouter);

exports.api = functions.https.onRequest(app);
