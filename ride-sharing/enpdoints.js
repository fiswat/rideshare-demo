const express = require('express');
const router = express.Router();
const Users = require('./middlewares/Users').Users;
const Vehicles = require('./middlewares/Vehicles').Vehicles
const suggestBestAlgo = require('./Algo/FindAlgo').suggestBestAlgo;
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

router.post('/find_best_algo', (req,res)=>{
    times_parsed = JSON.parse(req.body.times);
    let times = [];
    times = times_parsed.map(cur=>{
        return {
            arrival : cur[0],
            prep : cur[1]
        }
    });
    let algos = ["SJF", "FIFO"];
    let algo = suggestBestAlgo(times, algos)
    res.status(200).send({algo});

});

router.post('/do_cpu_tasks', (req,res)=>{
    let n = req.body.n;
    let l = req.body.l;
    let type = req.body.type;
    if(type == 1){
        let cj = require('./Cores/cpu_jobs');
        let result = cj.printRandomStrings(n,l);
        res.send(result);
    }else{
        let cp = require('./Cores/child_process');
        let result = cp.start();
        res.send(result);
    }
    //times_parsed = JSON.parse(req.body.times);
    times = times_parsed.map(cur=>{
        return {
            arrival : cur[0],
            prep : cur[1]
        }
    });
    let algos = ["SJF", "FIFO"];
    let algo = suggestBestAlgo(times, algos)
    res.status(200).send({algo});

});

router.post('/', function (req, res) {
    console.log("WELCOME", req.body);
    res.end();
});
module.exports = router;