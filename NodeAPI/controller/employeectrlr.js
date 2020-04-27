var express = require('express');
var router = express.Router();

var { Employee } = require('../models/employee');
var objectid = require('mongoose').Types.ObjectId;

//localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in Retriving Employees:' + JSON.stringify(err, undefined, 2))
        }
    });
});

router.get('/:id',(req,res)=>{
    if (!objectid.isValid(req.params.id))
    return res.status(400).send(`No Record found with given id: ${req.params.id}`);

    Employee.findById((req.params.id),(err,doc)=>{
        if(!err){res.send(doc)}
        else{console.log('Error in getting employee details:' + JSON.stringify(err, undefined, 2))}
    })
})

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        office: req.body.office,
        salary: req.body.salary
    })
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else { console.log('Error in saving employee details:' + JSON.stringify(err, undefined, 2)) }
    })
});

router.put('/:id', (req, res) => {
    if (!objectid.isValid(req.params.id))
        return res.status(400).send(`No Record found with given id: ${req.params.id}`);

    var emp = {
        name: req.body.name,
        designation: req.body.designation,
        office: req.body.office,
        salary: req.body.salary
    }
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc) }
        else { console.log('Error in updating Employee details' + JSON.stringify(err, undefined, 2)) }
    })
});

router.delete('/:id', (req, res) => {
    if (!objectid.isValid(req.params.id))
        return res.status(400).send(`No Record found with given id: ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc) }
        else { console.log('Error in Deleting Employee details' + JSON.stringify(err, undefined, 2)) }
    })
})


module.exports = router;