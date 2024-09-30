const ensureAuthenticated = require('../middleware/authProductvalidation');

const router = require('express').Router();


router.get("/",ensureAuthenticated,(req,res)=>{
    res.status(200).json([
        {
            name: "phone",
            price:"10000"
        },
        {
            name: "TV",
            price:"40000"
        }
    ])
})

module.exports = router
