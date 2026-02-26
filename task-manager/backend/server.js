require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const routerTasks = require('./routes/tasks.js');

const app = express();

const build = express.static('public');
app.use(build);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/tasks', routerTasks);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});