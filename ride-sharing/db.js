class db {
    
    constructor() {
        let mysql = require('mysql');
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'rideshare'
          });
          this.#createTables(connection);          
          return connection;
    }
    
    #createTables(connection){
        connection.connect((err) => {
            if (err) throw err;
            let async = require('async');
            async.parallel([
                (callback)=>{
                  connection.query("CREATE TABLE IF NOT EXISTS users ( `id` BIGINT NOT NULL AUTO_INCREMENT , `name` VARCHAR(300) NOT NULL , `gender` VARCHAR(1) NOT NULL , `age` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;", (err,resp)=>{
                      if(err){
                          console.log(err);
                          return callback(err);
                      }else{
                          console.log('users table created', resp);
                          return callback(null, resp);
                      }
                  });
                },
                (callback)=>{
                  connection.query("CREATE TABLE IF NOT EXISTS vehicles ( `id` BIGINT NOT NULL AUTO_INCREMENT , `name` VARCHAR(300) NOT NULL , `registration` VARCHAR(300) NOT NULL , `user_id` BIGINT NOT NULL , PRIMARY KEY (`id`), FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE = InnoDB;", (err,resp)=>{
                      if(err){
                          console.log(err);
                          return callback(err);
                      }else{
                          console.log('vehicle table created', resp);
                          return callback(null, resp);
                      }
                  });
                },
          
            ],(err, resp)=>{
                if(err){
                    console.log(err);
                }else{
                  console.log(resp);
                }
            })
            console.log('Connected!');
          });

    }

    
}
let instance;
let getInstance = ()=>{ 
    if(!instance){
        console.log('New Connection');
        instance = new db();
        Object.freeze(instance);
    }
    return instance;
}
exports.getInstance = getInstance;

