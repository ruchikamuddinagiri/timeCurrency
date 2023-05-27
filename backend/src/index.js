const express = require('express')
const path = require('path')
const userRouter = require('./routers/user')
const budgetRouter = require('./routers/timeBudget')
const postRouter = require('./routers/post')

const cookieParser = require('cookie-parser')
const cors = require('cors');

require('./db/mongoose')

const User = require('./models/user.js')
const Budget = require('./models/tasks')
const post = require('./models/post')

const app = express()
const port = process.env.PORT

app.use(express.json())
//'http://localhost:3000', 'http://127.0.0.1:3000'
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://www.affirmations.dev/']
const corsOptions ={
    origin: allowedOrigins, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(userRouter)
app.use(budgetRouter)
app.use(postRouter)
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.listen(port, () => {
    console.log("server is up on port", process.env.PORT)
})