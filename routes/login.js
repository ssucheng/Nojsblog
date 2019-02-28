const db = require("../lib/db");
let returnUrl;

exports.form = function(req, res){
    returnUrl = req.query.return;
    res.render("login")
}

exports.submit = function(req, res){
    const data = req.body;
    db.existUser([data.username, data.password], (result) => {
        if(result.length > 0){
            const user = result[0];
            req.session.uid = user.id;

            if(returnUrl){
                res.redirect(returnUrl);
                return;
            }

            res.redirect("/");
        }else{
            res.send("Sorry! invalid credentials.");
        }
    });
}

exports.logout = function(req, res){
    req.session.destroy(function(err){
        if(err) throw err;
        res.redirect("/");
    })
}