const db = require("../db");

module.exports = function(req, res, next){
    const uid = req.session.uid;
    if(!uid){
        return next();
    }

    db.findUserById(uid, (result) => {

        if(result.length > 0){
            const user = result[0];
            res.locals.user = user;
        }
        next();
    })

}