const express = require('express');
const router = express.Router();
const Users = require('./middlewares/Users').Users;
const Vehicles = require('./middlewares/Vehicles').Vehicles
//let user = new Users();



router.post('/add_user', (req,res)=>{
    console.log(req.body);
    new Users().add_user(req.body.data, (err , resp)=>{
        return res.send({err, resp});
    })

});

router.post('/add_vehicle', (req,res)=>{
    console.log(req.body);
    new Vehicles().add_vehicle(req.body.data, (err , resp)=>{
        return res.send({err, resp});
    })

});

router.post('/', function (req, res) {
    console.log("WELCOME", req.body);
    res.end();
});
module.exports = router;