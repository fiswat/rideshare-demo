const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os');

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'local'
const env = process.env.NODE_ENV;
const hostname = env == 'local' ? '127.0.0.1' : '0.0.0.0';
const port = 3000;
//cluster.fork();


/* app.listen(port, hostname, () => {
  console.log(os.totalmem()/1073741824,os.freemem()/1073741824);
  console.log(os.cpus().length);
  console.log(`Server running at http://${hostname}:${port}/ on ${env} environment as process ${process.pid} whose parent is ${process.ppid}`);
}); */
app.use(bodyParser.json({ limit: '50mb' }));
let endpoints = require('./enpdoints');
//const { mapValuesLimit } = require('async');
//const { Console } = require('console');
app.use('/', endpoints);
//console.log(process.argv);
if(process.argv[2] == "db"){
  setTimeout(() => {
    let db = require('./db').getInstance();
    db.query("SHOW DATABASES;", (err, resp) => {
      console.log('DB connection established successfully');
    });
  }, 5000)

}



process.on('SIGINT', () => {
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  process.exit();
});

// quit properly on docker stop
process.on('SIGTERM', () => {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  process.exit();
})


// 2 arrays 
/* let a = [1,4,7,9,10, 34, 66, 99 ,12]; //exists in B not in A
let b = [2, 5,7,9,3,6, 7, 9 , 12, 33, 98, 99, 100 ] ;// add the missing numbers to A. sort both a and b
let c = [];


b.map((val, idx, arr)=>{
  let flag = true; // missing
  a.map((bval)=>{
    val == bval && (flag = false) // found
  });
  flag && c.push(val) ;
});
a = a.concat(c);
a = a.sort((X,Y)=>{
  return X - Y;
});
b = b.sort((a,b)=>{
  return a - b;
});
b = Array.from(new Set(b));
console.log("A", a, "B", b);
//console.log();
a = [...a, c];
//console.log("A", a);


user 
// in 2017 
id name     joining_date           salary 
12 Akash  2015-03-09 13:67:90    900000
#SELECT * FROM employees WHERE YEAR(date) = 2015 ORDER BY salary DESC ;


plaindrome (121 )

let isPlaindrome = (value = 121)=>{
  value = value.toString();
  return value == value.trim().split('').reverse().join('');
}

let test = ["abc", "bba", "eye", 232, 'e ye']
test.forEach((v,idx,arr)=>{
  console.log(isPlaindrome(v));

});
((value = '121')=>{
  return value == value.split('').reverse().join('');
})() */

if(cluster.isMaster){
  console.table({"cpus" : os.cpus().length, "mem" : `${Math.round( os.totalmem()/1073741824)} GB`, "freemem":  `${Math.round(os.freemem()/1073741824)} GB` })
  let cpus = os.cpus();
  for (cpu of cpus){
    cluster.fork();
  }
  cluster.on('exit', (listener,code, signal)=>{
    onsole.log(`process ${process.pid} killed`);

  });
  
  //console.log("cW",cluster.worker,cluster.workers );
}else{
  app.listen(port, hostname, () => {
    
    
    console.log(`Server running at http://${hostname}:${port}/ on ${env} environment as cluster id : ${cluster.worker.id}, process id : ${process.pid} with parent process id : ${process.ppid}`);
  });
}



