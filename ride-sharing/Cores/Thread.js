//const fib = require('./FibonacciSeries').FibonacciSeries;

const { parentPort, workerData } = require('worker_threads')

let startIndex = workerData.startIndex;
let offset = workerData.offset;
let shared_memory = workerData.shared_memory;
if (!shared_memory) {
    //console.log('Not Shared');
    let result = [];
    for (i = startIndex; i < offset + startIndex; i++) {
        result = [...result, i]
    }
    parentPort.postMessage(result);
} else {
    //console.log('Shared');
    parentPort.on('message', (sharedData) => {
        for (i = startIndex; i < offset + startIndex; i++) {
            Atomics.store(sharedData, i, i);
        }
        process.exit();
    })
}






