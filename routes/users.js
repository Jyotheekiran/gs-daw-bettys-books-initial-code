// Create a new router
const express = require("express")
const router = express.Router()

router.get('/register', function (req, res, next) {
    res.render('register.ejs')                                                               
})    

router.post('/registered', function (req, res, next) {
    // saving data in database
    res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email)                                                                           
})

router.get('./adduser', function (req, res, next) {
    res.render('adduser.ejs')
})

router.post('./users/useradded', function (req, res, next) {
    // saving data in database
    let sqlquery = "INSERT INTO users (fname, lname, email, password) VALUES (?,?)"
    // execute sql query
    let newrecord = [req.body.fname, req.body.lname, req.body.email, req.body.password]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(' This user is added to database, first name: '+ req.body.fname + ' last name '+ req.body.lname)
    })
}) 


// Export the router object so index.js can access it
module.exports = router

