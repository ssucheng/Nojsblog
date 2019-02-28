const db = require("../lib/db");
const formidable = require('formidable');
const path = require("path");

exports.form= (req, res) => {
    const uid = req.session.uid;
    db.findUserById(uid, (results) => {
        res.render("acount", {
            user: results[0]
        })
    })
}

exports.submit = (req, res) => {

    const form = new formidable.IncomingForm();
    const data = req.body;
    
    // form.parse(req, function(err, fields, files) {
    //     console.log(files)
    // });
    
    form.uploadDir = path.resolve(__dirname, "../public/upload");

    form.parse(req, (err, fields, files) => {
        if (err) {
            throw err;
        }
        
        console.log(files)

        const name = fields.name;
        const avator = path.basename(files.avator.path);
        const data = {
            id: req.session.uid,
            name: name,
            avator: avator
        }

        db.updateUser(data, () => {
            res.redirect("back");
        })
    })
}