const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/EmployeeDB',{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{

    if(!err){

        console.log("Database Connected");
    }else{
        console.log("Database Not Connected"+err);
    }

});
require("./employee.model")