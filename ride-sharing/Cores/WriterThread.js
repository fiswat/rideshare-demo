const { workerData, parentPort } = require('worker_threads');

parentPort.on('message',(sharedData)=>{
    console.log("Writer");
    sharedData.forEach((val,idx,arr)=>{
        console.log(`Writing ${idx} value ${idx*idx}`);
        Atomics.compareExchange(sharedData, idx, 0, idx*idx);
        console.log(`Notifying reader thread`);
        Atomics.notify(sharedData, idx, 1);
        if(idx == workerData.length - 1 ){
            process.exit();
        }
    });
    //process.exit();
});