var http = require('http');
var ejs = require('ejs');

var app = require('./model/express-router');// 引入 封装路由

http.createServer(app).listen(8080); // 创建服务

app.get('/',function(req,res){ // 首页 路由
    ejs.renderFile('./views/index.ejs',{},function(err,data){
        if(err){
            console.log('err')
        }else{
            res.send(data);
        }
    })
})

app.get('/login',function(req,res){ // 登录表单 路由
    ejs.renderFile('./views/login.ejs',{},function(err,data){
        if(err){
            res.send('404')
        }else{
            res.send(data);
        }
    })
})

app.post('/dologin',function(req,res){ // 登录成功页 路由
    let str = '';
    req.on('data',function(chunk){
        str += chunk;
    })
    req.on('end',function(err){
        if(err){
            res.send('404')
        }else{
            ejs.renderFile('./views/dologin.ejs',{
                msg:str
            },function(err,data){
                if(err){
                    res.send('404')
                }else{
                    res.send(data)
                }
            })
        }
    })
})