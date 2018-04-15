/*
1.中间件不同的写法
2.使用body-parser中间件对post请求上传数据的获取（不同上传类型[json/urlencoded]有不同的中间件）,并且数据形式为key value键值对形式
3.注意mw2的写法，返回的是函数
*/
const express=require('express');
const http=require('http');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const server=http.createServer(app);
server.listen(9999);

function mw1(req,res,next){
	console.log(req);
	console.log(req.body);
	console.log(req.query);
	console.log('mw1');
	next();
}
function mw2(options){
	return function (req,res,next){
		if(options.whatEver){
			console.log('exist whatEver');
		}
		console.log('mw2');
		next()
	};
}
function mw3(req,res,next){
	console.log('mw3');
	res.end('done');
}
app.use(mw1);
app.use(mw2({whatEver:55}));
app.use(mw3);
//app.use(mw1,mw2,mw3);
//app.use([mw1,mw2],mw3);
//app.use(mw1,[mw2,mw3]);