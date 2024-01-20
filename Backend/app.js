const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/users', usersRouter.router);
app.use('/api', groupsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;