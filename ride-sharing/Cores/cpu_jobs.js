let printRandomStrings = (n, l)=>{
    let res =[];
    for(let i=0;i<n;i++){
        //console.log(i);
        let prev = 0;
        let str = '';
        for(let j=0;j<l; j++){
            //console.log(i);
            if([0,3].includes(prev)){
                let ascii = Math.round(Math.random() * (57 - 48)) + 48;
                str += String.fromCharCode(ascii);
                prev = 1                
            }else if([1].includes(prev)){
                let ascii = Math.round(Math.random() * (90 - 65)) + 65;
                str += String.fromCharCode(ascii);
                prev = 2 
            }else if([2].includes(prev)){
                let ascii = Math.round(Math.random() * (122 - 97)) + 97;
                str += String.fromCharCode(ascii);
                prev = 3
            }
        }
        res.push(str);
    }
    return res;
}

process.on('message', (msg)=>{
    if(msg == "start"){
        let res = printRandomStrings(1000,200);
        process.send(res);
    }
})

console.time('time');
//console.log();
//console.timeLog('time',printRandomStrings(10000, 100) );
console.timeEnd('time');
exports.printRandomStrings= printRandomStrings;