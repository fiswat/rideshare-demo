const { spawn, fork } = require('child_process');
const { Readable } = require('stream')

console.log(process.pid, process.ppid);
let sub_process = spawn('ls', []);
sub_process.on('spawn', (data, data2, data3) => {
    console.log("spawned", sub_process.pid, sub_process.ppid, process.pid, process.ppid);

});

//sub_process.stdout.pipe(process.stdout);
sub_process.stdout.on('data', (chunk) => {
    //console.log("\n",`${chunk}`);
});

//sub_process.channel()
//console.log(__dirname);


let start = () => {
    let res;
    let forked = fork(`${__dirname}/cpu_jobs`, ['cj']);
    forked.on('spawn', () => {
        console.log("fork spawned", forked.pid, forked.ppid, process.pid, process.ppid);
        console.time("fork_time");

    });
    forked.on('exit', () => {
        console.log("Child Exited");
    });
    forked.on('message', (msg) => {
        //console.log(msg);
        //process.send(msg);
        res = msg;
        console.timeLog('fork_time', msg);
        forked.kill();
        console.timeEnd("fork_time");
    })
    forked.send('start');
    process.send(res);
    return res;
}
exports.start = start;




