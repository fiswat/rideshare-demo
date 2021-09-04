const express = require('express');
const router = express.Router();
const Users = require('./middlewares/Users').Users;
const Vehicles = require('./middlewares/Vehicles').Vehicles
const suggestBestAlgo = require('./Algo/FindAlgo').suggestBestAlgo;
//let user = new Users();


router.get('/rctest', (req, res) => {
    res.send({ pid: process.pid })


});

router.post('/printFibonacci', (req, res) => {
    let threads = req.body.threads;
    let length = req.body.length;
    let shared_memory = req.body.shared_memory;
    if (threads == 1) {
        let result = [];
        for (i = 0; i < length; i++) {
            result = [...result, i]
        }
        return res.status(200).send({ result, type: "regular" });
    } else if (threads > 1) {
        const { Worker } = require('worker_threads');
        let result = [];
        inits = Math.floor(length / threads);
        let offsets = {
            inits: inits,
            nth: length - (inits * (threads - 1))
        }
        let exited = 0;
        let sharedInt32Arr;
        if (shared_memory) {
            let sharedArrBuff = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * length);
            sharedInt32Arr = new Int32Array(sharedArrBuff);
        }
        for (let i = 0; i < threads; i++) {
            let isLast = i == threads - 1;
            let offset = isLast ? offsets.nth : offsets.inits
            let startIndex = i * offset;
            let worker = new Worker('./Cores/Thread.js', { workerData: { offset, startIndex, shared_memory } });
            let threadId = worker.threadId;
            console.table([{ i, startIndex, endIndex : offset+startIndex , threadId }])
            worker.on('error', (err) => {
                console.log(err);
            });
            if (shared_memory) {
                worker.postMessage(sharedInt32Arr);
                worker.on('exit', (code) => {
                    if (++exited == threads) {
                        return res.status(200).send({ result: sharedInt32Arr, type: "threads" });
                    }
                    //console.log(`Worker ${threadId} exited ${code}`);
                });
            } else {
                worker.on('message', (message) => {
                    result = [...result, ...message];
                    return result.length == length && res.status(200).send({ result: result, type: "threads" });
                });

            }
        }
    } else {
        return res.status(500).send({ result: "error", type: "threads" });
    }
});
router.post('/add_user', (req, res) => {
    console.log(req.body);
    new Users().add_user(req.body.data, (err, resp) => {
        return res.send({ err, resp });
    });



});

router.post('/add_vehicle', (req, res) => {
    console.log(req.body);
    new Vehicles().add_vehicle(req.body.data, (err, resp) => {
        let cluster = require('cluster');
        //console.log(cluster);
        res.send({ err, resp, pid: process.pid, ppid: process.ppid, clusterid: cluster.worker.id });
        cluster.worker.kill();

    })

});

router.post('/find_best_algo', (req, res) => {
    times_parsed = JSON.parse(req.body.times);
    let times = [];
    times = times_parsed.map(cur => {
        return {
            arrival: cur[0],
            prep: cur[1]
        }
    });
    let algos = ["SJF", "FIFO"];
    let algo = suggestBestAlgo(times, algos)
    res.status(200).send({ algo });

});

router.post('/do_cpu_tasks', (req, res) => {
    let n = req.body.n;
    let l = req.body.l;
    let type = req.body.type;
    if (type == 1) {
        let cj = require('./Cores/cpu_jobs');
        let result = cj.printRandomStrings(n, l);
        res.send({ result });
    } else {
        const { fork } = require('child_process');
        let child = fork('./Cores/cpu_jobs.js');
        child.send('start');
        child.on("message", (data) => {
            res.send({ data });
            child.kill();
        })
        child.on('spawn', () => {
            console.log('Forked');
        });
        child.on('exit', (code, signal) => {
            console.log("child exited", code, signal);
        })

        //let cp = require('./Cores/child_process');
        //let result = cp.start();
        //console.log("ep",process.pid);

    }
});

router.post('/', function (req, res) {
    console.log("WELCOME", req.body);
    res.end();
});
module.exports = router;