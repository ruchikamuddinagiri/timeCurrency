const express = require('express')
const path = require('path')
const userRouter = require('./routers/user')
const cookieParser = require('cookie-parser')
const cors = require('cors');

require('./db/mongoose')

const User = require('./models/user.js')

const app = express()
const port = process.env.PORT

app.use(express.json())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(userRouter)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.listen(port, () => {
    console.log("server is up on port", process.env.PORT)
})