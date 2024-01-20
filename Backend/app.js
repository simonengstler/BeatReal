const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');

const app = express();
var cors = require('cors')
const PORT = 3000;

app.use(cors())

app.use(bodyParser.json());

app.use('/api/users', usersRouter.router);
app.use('/api', groupsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
