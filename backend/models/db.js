const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CON;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("database connection is successful")

}).catch((err)=>{
    console.log("database connection is failed")
})