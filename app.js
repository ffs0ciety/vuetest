var express = require("express");
var app = express();
var cors = require('cors')
const path = require('path')
app.use(cors());
app.use(express.json());

var indexRouter = require('./backend/routes/index');

//Inicialización de la aplicación node
app.listen(3000, () => {
 console.log("Server running on port 3000");
});


//Redireccion a carpeta compilada con nuestro front
app.use(express.static(path.join(__dirname, './frontend/dist')))
app.use('/',indexRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/dist/index.html'))
})



module.exports = app;