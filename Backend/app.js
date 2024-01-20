const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(
    `[${req.method} ${req.path}] query=${JSON.stringify(
      req.query
    )} body=${JSON.stringify(req.body)}`
  );
  next();
});

app.use("/api", usersRouter);
app.use("/api", groupsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
