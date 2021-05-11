const express = require('express');
const Mongoose = require('mongoose');
var router = express.Router();
const Employee = Mongoose.model('Employee');

//View Insert Page Design
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});
//Insert Record
router.post('/', (req, res) => {
    if(req.body._id==''){
        insertRecord(req, res);
    }else{
        updateRecord(req,res);
    }
});
//Get All List Of Inserted Employees
router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
            list: docs
            })
        } else {
            console.log('Error in retriving employee list:' + err);
        }
    });
});
//Edit Of Record
router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle:"Update Employee",
                employee:doc
            });
        }
    });
});

//Record Deletion
router.get('/delete/:id',(req,res)=>{
   
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.render('employee/list');
        }
        else{

            console.log("Error in Delete:"+err)
        }

    });
});
//User Defined Function For Record Insert
function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list')
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            } else {
                console.log('Error During record Insertion:' + err)
            }
        }
    })
}

//User Defined Function For Record Update
function updateRecord(req,res){
    Employee.findByIdAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name=="ValidationError"){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle:'Update Employee',
                    employee:req.body
                });
            }else{
                console.log("Error during record Update:"+err);
            }
        }
    });
}
//Handling of Validation
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
            }
}
}
module.exports = router; //ES6 Syntax