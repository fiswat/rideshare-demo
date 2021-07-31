let Scrub = require('../Scrubber/Scrub').getInstance();
class Vehicles {

    constructor() {
    }

    add_vehicle(data, callback) {
        let db = require('../db').getInstance();
        let pass = Scrub.add_vehicle(data);
        if (pass.status) {
            let sql = "SELECT id FROM users WHERE name = ? ORDER BY id DESC";
            let args = [pass.data[0]];
            db.query(sql, args, (err, resp) => {
                if (err) {
                    return callback(err);
                } else {
                    if (resp.length) {
                        let sql = " INSERT INTO vehicles  (name,registration,user_id) VALUES (? ,?, ?) ";
                        let args = [pass.data[1], pass.data[2], resp[0].id];
                        let db = require('../db').getInstance();
                        db.query(sql, args, (err, resp) => {
                            if (err) {
                                return callback(err);
                            } else {
                                return resp.affectedRows && callback(null, true);
                            }
                        });

                    }else{
                        return callback({error : "Vehicle owner not found"});
                    }


                }
            });





        } else {
            return callback(pass.error);
        }
        return;
    }
}
exports.Vehicles = Vehicles;
