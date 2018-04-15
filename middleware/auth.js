module.exports=function auth(req,res,next){
	console.log(req.query);
	if(req.query.username==='dakai'){
		next();
	}else{
		res.end('please go away');
	}
}