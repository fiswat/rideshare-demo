const { workerData, parentPort } = require('worker_threads');

parentPort.on('message',(sharedData)=>{
    console.log("Reader");
    sharedData.forEach((val,idx,arr)=>{
        console.log(`Awaiting read ${idx}`);
        Atomics.wait(sharedData, idx, 0, 5000);
        Atomics.compareExchange(sharedData, idx, idx*idx, 2*idx*idx) 
        //let data = Atomics.load(sharedData, idx);
        //console.log(`Read ${idx} value ${data}`);
        //console.log(data);
        if(idx == workerData.length - 1 ){
            process.exit();
        }
        //Atomics.compareExchange(sharedData, idx, idx*idx, 2*idx*idx) 
    });
    //process.exit();
});