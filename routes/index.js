
const db = require("../lib/db");

exports.view = function(req, res){

    const page = req.query.page || 1;

    // db.findAllPosts(result => {
    //     res.render("index", { posts: result });
    // })

    db.findPostByPage(page, result => {

        db.findPostCount((count) => {

            res.render("index", { 
                posts: result,
                count: count[0].count,
                page: page
            });
        })
    })
}