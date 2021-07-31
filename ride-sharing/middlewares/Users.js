let Scrub = require('../Scrubber/Scrub').getInstance();
class Users {
    
    constructor() {
    }
    
    add_user(data, callback){
        let pass = Scrub.add_user(data);
        if (pass.status){
            let sql = " INSERT INTO users  (name,gender,age) VALUES (? ,?, ?) ";
            let args = pass.data;
            let db = require('../db').getInstance();
            db.query(sql, args, (err, resp)=>{
                if(err){
                    return callback(err);
                }else{
                    return resp.affectedRows && callback(null, true);
                }
            });

        }else{
            return callback(pass.error);
        }
        return;
    }
}
exports.Users = Users;
