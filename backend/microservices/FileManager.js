const path = '../data/database.json';

exports.getFile = _data => {
    var file = require(path);
    return file;
}

exports.addData = _data => {
    var file = require(path);
    return "jejej";
}

