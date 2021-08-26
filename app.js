var express = require("express");
var app = express();
var cors = require('cors')
app.use(cors());
app.use(express.json());

var indexRouter = require('./routes/index');

app.listen(3000, () => {
 console.log("Server running on port 3000");
});


app.use('/',indexRouter);



// app.get("/url", (req, res, next) => {

//     var obj = {
//         "estacion":"grandvalida",
//         "comlementos": [
//             {"comida":"arroz"},
//             {"snowboard":"si"}
//         ]
//     }

//     res.json(obj);
// });

module.exports = app;