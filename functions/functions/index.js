const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");
const eventsRouter = require("./routes/events");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
app.use("/events", eventsRouter);

exports.api = functions.https.onRequest(app);
