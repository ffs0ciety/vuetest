const routes = require('../apiServices/routes')
const express = require("express")
var router = express();

router.use('/api', routes);

module.exports = router;