var Student=require("../models/Student.js");
var formidable =require("formidable");


exports.showIndex=function(req,res){
	res.render("index.ejs");
}

exports.showAdd=function(req,res){
	res.render("add.ejs");
};


exports.doAddStudent=function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		//console.log(fields);
		// var s = new Student(fields);
		// s.save();
		Student.addStudent(fields,function(results){
			res.json({"results":results});
		});	
	})
}


exports.checkID=function(req,res){
	var sid=req.params.sid;
	Student.checkSid(sid,function(results){
		res.json({"results":results});
	})
}
exports.getAllStudent=function(req,res){
	Student.find({},function(err,results){
		res.json({"results":results});
	})
}





exports.updateStudent=function(req,res){
	var sid=req.params.sid;
	if(!sid){
		return;
	}

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {

		Student.find({"sid":sid},function(err,results){
			if(results.length==0){
				res.json({"results":-1});
				return;
			}

			var s =results[0];
			s.name=fields.name;
			s.age=fields.age;
			s.gender=fields.gender;

			s.save(function(err){
				if(err){
					res.json({"results":-1});
				}else{
					res.json({"results":1});
				}
			});
		})
	})
}

exports.deleteStudent=function(req,res){
	var sid=req.params.sid;

	Student.find({"sid":sid},function(err,results){
		if(err || results.length==0){
			res.json({"results":-1});
			return;
		}
		results[0].remove(function(err){
			if(err){
				res.json({"results":-1});
				return;
			}
			res.json({"results":1});
		})
	})
}

exports.showEdit=function(req,res){
	var sid=req.params.sid;
	Student.find({"sid":sid},function(err,results){
		if(results.length==0){
			res.send("ID NOT FOUND..");
			return;
		}
		res.render("edit.ejs",{
			info:results[0]
		});
	})	
}
