const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
const authRouter = require('./routes/authRouter');
const productRouter = require("./routes/productRouter")
require("dotenv").config();
require("./models/db")

PORT = process.env.PORT || 9090;

app.get('/',(req,res)=>{
    res.send('yes it is')
})


app.use(bodyParser.json());
app.use(cors());
app.use('/auth',authRouter)
app.use('/products',productRouter)

app.listen(PORT,()=>{
    console.log(`app is runnin on this ${PORT} `)
})