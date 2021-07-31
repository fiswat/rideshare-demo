var express = require('express');
var router = express.Router();
console.log('USERS..');
//var bodyParser = require('body-parser');
//router.use(bodyParser.urlencoded({ extended: true }));
//router.use(bodyParser.json());
//var User = require('./User');
// ADD THIS PART
// CREATES A NEW USER
router.post('/add_user', function (req, res) {
    console.log("Adding vehicle");
});
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    console.log("getting vehicle");
});
module.exports = router;