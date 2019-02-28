// 导入mysql模块
const mysql = require('mysql');

// 创建数据库链接
const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
});

// 开启链接
connection.connect();

// 用户表结构
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NOT NULL COMMENT '头像',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( id )
    );`

let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '文章作者',
     title TEXT(0) NOT NULL COMMENT '题目',
     content TEXT(0) NOT NULL COMMENT '内容',
     uid VARCHAR(40) NOT NULL COMMENT '用户id',
     moment TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT '发表时间',
     comments VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '文章评论数',
     pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
     PRIMARY KEY(id)
    );`

// 封装创建表的方法
let createTable = ( sql ) => {
    return connection.query(sql, function (error, results, fields) {
        if (error) throw error;
    });
}

// 建表
createTable(users)
createTable(posts)

// 注册用户
exports.insertUser = ( value ) => {
    connection.query( 
        "insert into users set name=?,pass=?,avator='',moment='';",
        value,
        function (err, results, fields) {
            if (err) throw err;
            // connected!
        }
    );
}

// 查找用户
exports.findUserByName = ( name, callback ) => {
    connection.query(
        "select * from users where name=?;",
        [name],
        function(err, results, fields){
            if(err) throw err;

            callback(results);
        }
    )
}

// 根据id查找用户
exports.findUserById = (id, callback) => {
    connection.query(
        "select * from users where id=?;",
        [id],
        function(err, results, fields){
            if(err) throw err;

            callback(results);
        }
    )
}

// 用户是否存在
exports.existUser = (value = [], callback) => {
    connection.query(
        "select * from users where name=? and pass=?;",
        value,
        function(err, results, fields){
            if(err) throw err;

            callback(results);
        }
    )
}

// 修改用户信息
exports.updateUser = (data, callback) => {
    connection.query(
        `update users set name='${data.name}',avator='${data.avator}' where id=${data.id}`,
        function(err, results){
            if(err) throw err;
            callback(results);
        }
    )
}

// 写入文章
// name VARCHAR(100) NOT NULL COMMENT '文章作者',
// title TEXT(0) NOT NULL COMMENT '题目',
// content TEXT(0) NOT NULL COMMENT '内容',
// uid VARCHAR(40) NOT NULL COMMENT '用户id',
exports.insertPost = (value = [], callback) => {
    connection.query(
        "insert into posts set name=?,title=?,content=?,uid=?",
        value,
        function(err, results, fields){
            if(err) throw err;
            callback(results);
        }
    )
}

// 查找所有的文章
exports.findAllPosts = (callback) => {
    connection.query(
        "select * from posts;",
        function(err, results, fields){
            if(err) throw err;
            callback(results);
        }
    )
}

// 查看分頁文章
exports.findPostByPage = (page,callback) => {
    connection.query(
        `select * from posts limit ${ (page-1) * 5 },5;`,
        function(err, results){
            if(err) throw err;
            callback(results);
        }
    )
}

// 查看所有文章的数量
exports.findPostCount = (callback = () => {}) => {
    connection.query(
        "select count(*) as count from posts",
        function(err, results){
            if(err) throw err;
            callback(results);
        }
    )
}

// 通过id查找文章
exports.findPostById = (id, callback) => {
    connection.query(
        `select * from posts where id=${id}`,
        function(err, results){
            if(err) throw err;
            callback(results)
        }
    )
}

// 编辑文章
exports.updatePost = (data, callback) => {
    connection.query(
        `update posts set title='${data.title}',content='${data.content}' where id=${data.id}`,
        function(err, results){
            if(err) throw err;
            callback(results)
        }
    )
}