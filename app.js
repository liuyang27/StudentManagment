var express=require("express");
var app=express();
var mainctrl =require("./controllers/mainctrl.js");

const mongoose = require('mongoose');
mongoose.connect('some connection string...');

app.set("view engine","ejs");

app.get("/",	                mainctrl.showIndex);
app.get("/add",	                mainctrl.showAdd);
app.get("/student",             mainctrl.getAllStudent);
app.post("/student",            mainctrl.doAddStudent);
app.propfind("/student/:sid",   mainctrl.checkID);
app.get("/student/:sid",        mainctrl.showEdit);
app.post("/student/:sid",       mainctrl.updateStudent);
app.delete("/student/:sid",     mainctrl.deleteStudent);



app.use(express.static("public"));


app.listen(3000);
console.log("server is running on port 3000");