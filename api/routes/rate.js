const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/rate', (req, res) => {
    var rate = req.body.rate;
    var tutor = req.body.tutor;
    var student = req.body.student;

    var sql = "insert into Rate(tutor, student, rating) values('"+tutor+"', '"+student+"', '"+rate+"')";
    con.query(sql, (err, result) => {
        if(err){
            throw err;
            res.json({
                success: false
            });            
        } 
        else{
            var sql1 = "update Tutor set Tutor.rate = (select avg(Rate.rating) as rate from Rate where Rate.tutor='"+tutor+"') where Tutor.email='"+tutor+"'";
            con.query(sql1, (err, result) => {
                if(err){
                    throw err;
                    res.json({
                        success: false
                    });
                }
                else{
                    console.log(result);
                    res.json({
                        success: true
                    });
                }
            })
            
        }
    });
})

module.exports = router;