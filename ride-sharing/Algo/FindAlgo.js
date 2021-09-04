//let Pipe = require('./Pipe').Pipe;
let times = [
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

let algos = ["SJF", "FIFO"];

let findWaitTime = (t, algo) => {
    //times =
    t  = t.sort((a,b)=>{
        return a.arrival-b.arrival;
    });//console.log("sorted",t);
    let times = t;
    let new_times = [];
    times.map((val, idx, arr) => {
        let temp = {...val};
        temp.wait = algo == "SJF" ? times[times.length - 1].arrival + temp.prep : (times[idx - 1] && temp.arrival <= new_times[idx-1].end ? new_times[idx - 1].end - temp.arrival + temp.prep : temp.prep);
        temp.end = algo == "SJF" ? (times[idx - 1] ? new_times[idx - 1].end + temp.prep : temp.prep + temp.wait) : (times[idx - 1] ? new_times[idx - 1].end + temp.prep : temp.prep);
        new_times.push(temp);
        //console.log('temp', temp, times[idx - 1]);
        return temp;
    });
    //console.log('calc',new_times, times);
    return algo=="SJF"? (new_times.sort((a,b)=>{
        return a.wait-b.wait;
    })): new_times;

}

let findAvg = (times) => {
    //console.log(times);
    let time = times.reduce((prev, cur) => {
        //console.log("a", prev, cur);
        return (prev.wait ? prev.wait : prev) + cur.wait;
    });
    return time / times.length;
}

let mapAlgoTimes = (t, algos)=>{
    let decisionArr = [];
    algos.map((algo,idx,arr)=>{
        let times = t;
        let time = findWaitTime(times, algo);
        let avg = findAvg(time)
        decisionArr.push({algo : algo, time : avg})

    });
    return decisionArr;

    

}

let findBestAlgo = (times)=>{
    //console.log("which",times);
    return times.reduce((prev, cur)=>{
        //console.log(prev, cur);
        return prev.time < cur.time ? prev : cur;
    });
}

let suggestBestAlgo = (times, algos)=>{
    return findBestAlgo(mapAlgoTimes(times,algos));
}

//console.log(suggestBestAlgo(times, algos));

exports.suggestBestAlgo = suggestBestAlgo;


