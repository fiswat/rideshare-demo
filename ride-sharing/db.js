class db {

    constructor(callback) {
        let mysql = require('mysql');
        //console.log(process.env.NODE_ENV);
        const connection = mysql.createConnection({
            host: (process.env.NODE_ENV == 'local' ? 'localhost' : 'mysql-dcc'),
            //localAddress : (process.env.NODE_ENV == 'local' ? 'localhost' : 'mysql-dcc'),
            user: 'root',
            password: 'password',
            database: 'rideshare'
        });
        //console.log(connection);
        this.#createTables(connection);
        return connection;
    }
    #createTables(connection) {
        connection.connect((err) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                console.log("DB alive");
                let async = require('async');
                async.parallel([
                    (callback) => {
                        connection.query("CREATE TABLE IF NOT EXISTS users ( `id` BIGINT NOT NULL AUTO_INCREMENT , `name` VARCHAR(300) NOT NULL , `gender` VARCHAR(1) NOT NULL , `age` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;", (err, resp) => {
                            if (err) {
                                console.log(err);
                                return callback(err);
                            } else {
                                console.log(resp.warningCount ? 'users table exists' : 'users table created');
                                return callback(null, resp);
                            }
                        });
                    },
                    (callback) => {
                        connection.query("CREATE TABLE IF NOT EXISTS vehicles ( `id` BIGINT NOT NULL AUTO_INCREMENT , `name` VARCHAR(300) NOT NULL , `registration` VARCHAR(300) NOT NULL , `user_id` BIGINT NOT NULL , PRIMARY KEY (`id`), FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE = InnoDB;", (err, resp) => {
                            if (err) {
                                console.log(err);
                                return callback(err);
                            } else {
                                console.log(resp.warningCount ? 'vehicles table exists' : 'vehicles table created');
                                return callback(null, resp);
                            }
                        });
                    },

                ], (err, resp) => {
                    if (err) {
                        console.log(err);
                        //return callback(err);
                    } else {
                        console.log("DB migration script executed successfully");
                        //return callback(null, 1);
                    }
                })
                console.log('Mysql Connected!');

            }

        });

    }


}

let instance;
let getInstance = () => {
    if (!instance) {
        console.log('New Connection');
        instance = new db();
        Object.freeze(instance);
    }
    return instance;
}
exports.getInstance = getInstance;

