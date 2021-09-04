const fib = require('./FibonacciSeries').FibonacciSeries;

const { parentPort, Worker, workerData} = require('worker_threads')

let startIndex = workerData.startIndex;
let offset = workerData.offset;

let result = fib.withinIndexRangeOffset(startIndex, offset);
parentPort.postMessage(result);

