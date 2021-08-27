const express = require("express");
const { getData, linkClientsCoaches, test } = require("./controller");
var router = express();

router.get('/data', getData);
router.post('/linkclientscoaches', linkClientsCoaches);


module.exports = router;