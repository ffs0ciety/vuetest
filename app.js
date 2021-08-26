var express = require("express");
var app = express();
var cors = require('cors')
const path = require('path')
app.use(cors());
app.use(express.json());

var indexRouter = require('./backend/routes/index');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, './frontend/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + './frontend/build/index.html'))
})

app.use('/',indexRouter);




module.exports = app;