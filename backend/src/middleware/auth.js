const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    
    //const token = req.header('cookie').replace('auth_token=', '')
    
    try{
        
        //get the token from the request header
        console.log(req.header('cookie'))
        let token = req.header('cookie').replace('auth_token=', '')
        //console.log(token.lastIndexOf(";"))
        if(token.lastIndexOf(";") != -1){
            token = token.slice(token.lastIndexOf(";")+2, token.length)
            //console.log(token)
        }
        

        //const token = req.header('Authorization').replace('Bearer ', '')
        

        //decode the token against the string provided for creating the sign in models/user.js
        const decoded = jwt.verify(token, "thisismynodecourse")
        //console.log(decoded)

        //while creating the sign, we had used the user's id. 
        //so, decoded will have the user's id as the _id property

        //then, we find the user using findOne on the User model
        //two search criteria: user id and token
        //user output will be the user document with the given token
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        //console.log("from middleware", user)

        //check whether user exists, else throw error
        if(!user){
            //console.log("user not found")
            throw new Error()
            
        }
        //this will run if the user exists
        //since we have already retrieved the user, 
        //do not make the route handler(routers/user.js) fetch the user again
        //set a new property on req called user and assign the constant 'user' to it
        
        req.token = token
        req.user = user
        //call next for the route handler to run
        next()
        //_xsrf=2|e8eafce3|fe9040c6ad49caef11a4c659843fe555|1681434844; username-localhost-8889="2|1:0|10:1681482343|23:username-localhost-8889|44:MGY1NTdmNmM1NTVkNDI4Y2EwOGEwYzQ0M2ExOTMzNTc=|2fa37f7273afdcc57c258db16a761fdddd02e0bf7e285bd40c7f9828f17bcb7a"; username-localhost-8888="2|1:0|10:1681703532|23:username-localhost-8888|44:N2YwYWM1ZTdmNDhlNDg1OWJlZGQyY2Y3ZTRjNTc1ZTQ=|f6d1b13f9bae9a59174aa454e8205acb83f328f69fba12bae860c855837db618"; eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNjOTIwOGZlYjlmM2VlNjQxOGYzMmMiLCJpYXQiOjE2ODIzNzI5NjB9.8fwqWSy61uZ5vvlg21HjufFKUrnGeXDoVeefVhpexzo

    } catch (e){
        //res.status(401).redirect('/')
        console.log(e)
        res.status(401).send('Please authenticate!')
    }
    
}

module.exports = auth