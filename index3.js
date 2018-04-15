/*
通过路由（method、path、query、content-type），对请求分发，对流程进行控制
*/
const express=require('express');
const http=require('http');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const server=http.createServer(app);
server.listen(9999);

app.use((req,res,next)=>{
	req.middleware=[];
	next();
});

function mw1(){
	return function (req,res,next){
		console.log(req.headers);
		console.log(req.headers['content-type']);
		console.log(req.method);
		console.log(req.query);
	req.middleware.push('mw1');
	next();
	}
}

function mw2(req,res,next){
	req.middleware.push('mw2');
	next();
}

function mw3(req,res,next){
	req.middleware.push('mw3');
	res.end(JSON.stringify(req.middleware));
}

app.use('/',mw1());
app.get('/article',mw2);
app.post('/user',mw2);
app.use('/',mw3);