//let Pipe = require('./Pipe').Pipe;
/*let times = [
    {
        arrival: 0,
        prep: 7
    },

    {
        arrival: 5,
        prep: 8
    },
    {
        arrival: 7,
        prep: 5
    },
    {
        arrival: 10,
        prep: 8
    },
    {
        arrival: 12,
        prep: 4
    },
    {
        arrival: 16,
        prep: 8
    }
]

let algs = ["SJF", "FIFO"]; */

let findWaitTime = (times, algo) => {
    times = times.map((val, idx, arr) => {
        val.wait = algo == "SJF" ? times[times.length - 1].arrival + val.prep : (times[idx - 1] ? times[idx - 1].end - val.arrival + val.prep : val.prep);
        val.end = algo == "SJF" ? times[idx - 1] ? times[idx - 1].end + val.prep : val.prep + val.wait : (times[idx - 1] ? times[idx - 1].end + val.prep : val.prep);
        return val;
    });
    return algo=="SJF"? (times.sort((a,b)=>{
        return a.wait-b.wait;
    })): times;

}

let findAvg = (times) => {
    let time = times.reduce((prev, cur) => {
        //console.log("a", prev, cur);
        return (prev.wait ? prev.wait : prev) + cur.wait;
    });
    return time / times.length;
}

let mapAlgoTimes = (times, algos)=>{
    let decisionArr = [];
    algos.map((algo,idx,arr)=>{
        let t = findWaitTime(times, algo);
        let avg = findAvg(t)
        decisionArr.push({algo : algo, time : avg})

    });
    return decisionArr;

    

}

let findBestAlgo = (times)=>{
    return times.reduce((prev, cur)=>{
        //console.log(prev, cur);
        return prev.time < cur.time ? prev : cur;
    });
}

let suggestBestAlgo = (times, algos)=>{
    return findBestAlgo(mapAlgoTimes(times,algos));
}

exports.suggestBestAlgo = suggestBestAlgo;


