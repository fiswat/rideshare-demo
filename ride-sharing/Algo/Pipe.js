'use strict'
class Pipe {

    constructor(...funcs) {
        this.funcs = funcs;
    }

    /**
     * 
     * @param {*} initialValue 
     * @example - Can be used with bind(), call() and apply()
     */
    do(initialValue) {
        if(!this.funcs){
            console.log(this, arguments);
            return {error : "Constructor must be declared"}
        }else{
            //debugger;
            return this.funcs.reduce((prevRes, curFunc) => {
                //debugger;
                return curFunc(prevRes);
            }, initialValue);
        }   
    }
    /**
     * 
     * @param  {...Function} funcs - comma seperated Pure Functions
     * @returns 
     */
    static pipe(...funcs) {
        return (initialValue) => {
            return funcs.reduce((prevRes, curFunc) => {
                return curFunc(prevRes);
            }, initialValue);
        };
    }

}
exports.Pipe = Pipe;
// let times = [
//     {
//         arrival: 0,
//         prep: 7
//     },

//     {
//         arrival: 5,
//         prep: 8
//     },
//     {
//         arrival: 7,
//         prep: 5
//     },
//     {
//         arrival: 10,
//         prep: 8
//     },
//     {
//         arrival: 12,
//         prep: 4
//     },
//     {
//         arrival: 16,
//         prep: 8
//     }
// ]

// let algos = ["SJF", "FIFO"];

// let findWaitTime = (times, algo) => {
//     times = times.map((val, idx, arr) => {
//         val.wait = algo == "SJF" ? times[times.length - 1].arrival + val.prep : (times[idx - 1] ? times[idx - 1].end - val.arrival + val.prep : val.prep);
//         val.end = algo == "SJF" ? times[idx - 1] ? times[idx - 1].end + val.prep : val.prep + val.wait : (times[idx - 1] ? times[idx - 1].end + val.prep : val.prep);
//         return val;
//     });
//     return algo=="SJF"? (times.sort((a,b)=>{
//         return a.wait-b.wait;
//     })): times;

// }

// //console.log(findWaitTime(times, "SJF"));
// //let t = findWaitTime(times, "SJF");
// /* let x = t.sort((a, b) => {
//     return a.wait - b.wait
// });
// console.log(x); */


// // minimum avg waiting for customers

// let findAvg = (times) => {
//     let time = times.reduce((prev, cur) => {
//         console.log("a", prev, cur);
//         return (prev.wait ? prev.wait : prev) + cur.wait;
//     });
//     return time / times.length;
// }

// //console.log(findAvg(t));

// let mapAlgoTimes = (times)=>{
//     let decisionArr = [];
//     algos.map((algo,idx,arr)=>{
//         let t = findWaitTime(times, algo);
//         let avg = findAvg(t)
//         decisionArr.push({algo : algo, time : avg})

//     });
//     return decisionArr;

    

// }
// let d = mapAlgoTimes(times);
// console.log(mapAlgoTimes(times));

// let findBestAlgo = (times)=>{
//     return times.reduce((prev, cur)=>{
//         //console.log(prev, cur);
//         return prev.time < cur.time ? prev : cur;
//     });
// }

// //console.log(findBestAlgo(d));

// new pipe = new Pipe(mapAlgoTimes,findBestAlgo);
// console.log(pipe.do(times));