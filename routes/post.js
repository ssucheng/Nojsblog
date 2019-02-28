const db = require("../lib/db");

exports.form = function(req, res){
    //console.log(res.locals)
    res.render("post-edit", { post: null });
}

exports.addPost = function(req, res){
    const data = req.body;

    db.insertPost([ 
        res.locals.user.name,
        data.title,
        data.content,
        res.locals.user.id,
     ], (result) => {
        res.redirect("/");
    })
}

exports.editPostForm = function(req, res){
    const pid = req.params.pid;

    db.findPostById(pid, (result) => {
        res.render("post-edit", {
            post: result[0]
        });
    })
}

exports.editPost = function(req, res){
    const data = req.body;

    db.updatePost(data, (result) => {
        res.redirect("/");
    })
}

exports.postDetail = function(req, res){
    const pid = req.params.pid;
    db.findPostById(pid, (result) => {
        res.render("post-detail", {
            post: result[0]
        });
    })
}