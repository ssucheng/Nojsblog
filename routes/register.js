const db = require("../lib/db");

// 处理注册页的页面返回
exports.form = function(req, res){
    res.render("register")
}

// 处理注册页的注册提交
exports.submit = function(req, res, next){
    var data = req.body;

    // 判断用户是否存在
    db.findUserByName(data.username, (result) => {
        if(result.length > 0){
            res.send("用户名重复");
            return;
        }

        // 新增用户数据
        db.insertUser([data.username, data.password])
        res.redirect("/login")
    })
}