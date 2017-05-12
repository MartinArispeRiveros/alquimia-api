'use strict';

var fs = require('fs');
var path = require('path');
var format = require('string-format');
const UPLOADS_FOLDER = '/../../uploads/';
module.exports = {
    uploadImage: uploadImage
};

function uploadImage(req, res) {
    var file = req.swagger.params.file.value;
    var newFileName = new Date().getTime() + path.extname(file.originalname);
    var location = format("{}{}", __dirname, UPLOADS_FOLDER);

    fs.writeFile(location + newFileName, file.buffer, function (err) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.json({ file_name: newFileName });
        }
    });
}
