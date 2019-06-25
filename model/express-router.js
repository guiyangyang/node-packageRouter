var url = require('url');

// 将 res.end() 封装成 res.send()
function changeRes(res){
    res.send = function(data){
        res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
        res.end(data);
    }
}

var Server = function () {
    var G = this; //全局变量

     G._get = {};//分别处理get post
     G._post = {};

    var app = function(req,res){
        
        changeRes(res);

        var pathname = url.parse(req.url).pathname; // 获取路径
        var method = req.method.toLowerCase(); // 获取请求方法

        if(!pathname.endsWith('/')){
            pathname = pathname + '/';
        }
        if(!pathname.startsWith('/')){
            pathname = '/'+pathname;
        }

        if(G['_' + method][pathname]){ 
            G['_' + method][pathname](req,res); //执行

        }else{
            res.end('no  router')
        }
    }

    app.get = function(string,callback){ // 注册get方法
        if(!string.endsWith('/')){
            string = string + '/';
        }
        if(!string.startsWith('/')){
            string = '/'+string;
        }
        G._get[string] = callback; 
    }

    app.post = function(string,callback){ // 注册post方法
        if(!string.endsWith('/')){
            string = string + '/';
        }
        if(!string.startsWith('/')){ 
            string = '/'+string;
        }
        G._post[string] = callback;

    }
    
    return app;
}

module.exports = Server();