/*
1.中间件会按照代码注册的顺序 从上到下的调用 
2.前面中间件对req、res处理的结果，后面中间件也能拿到（即对于同一个http请求，
  各个中间件中的req，res是一致的）
*/
const express=require('express');
const http=require('http');
const app=express();

const server=http.createServer(app);
server.listen(8888);

// app.use('/',(req,res)=>{
// 	res.end('hello');
// });


// app.use(auth);
app.use(require('./middleware/auth'));

app.use((req,res,next)=>{
	console.log('you got middleware no.1');
	req.duang=1;
	next('something wrong');
})
app.use((req,res)=>{
	console.log('you got middleware no.2');
	console.log(`req.duang: ${req.duang}`);
	res.end('hello my express demo');
})

// function auth(req,res,next){
// 	console.log(req);
// 	console.log(req.query);//query帮你自动处理了，所以直接能拿到结果（body是没有直接处理的）
	//console.log(req.body);
// 	if(req.query.username==='dakai'){
// 		next();
// 	}else{
// 		res.end('please go away');
// 	}
// }


app.use((err,req,res,next)=>{
	res.end(err);
})