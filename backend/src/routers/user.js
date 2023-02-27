const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const path = require('path')

const router = new express.Router()

//login page
router.get('/', (req,res) => {
    res.send("Home")
    //res.render('../views/index.ejs')
    //res.redirect("https://localhost:3000/login")
})

router.get('/login', (req,res)=>{
    //res.render('../views/register.ejs')
})
//register page
router.get('/register', (req,res)=>{
    //res.render('../views/register.ejs')
})

//add user
router.post('/api/auth/register', async (req, res) => {
    //remove password confirm field
    const req_user = {"name": req.body.name, "email":req.body.email, "password":req.body.password}
    const user = new User(req_user)
    console.log(user)
    try{
        await user.save()
        //create a token for the new user
        const token = await user.generateAuthToken()
        res.setHeader('Cache-Control', 'private');
        res.cookie('auth_token', token)
        res.status(201).send({user, token})
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

//log in
router.post('/api/auth/login', async (req, res) => {
    try{
        //find user by email id and password in req.body

        const user = await User.findByCredentials(req.body.email, req.body.password)
        //create token for the user
        const token = await user.generateAuthToken()
        
        res.cookie('auth_token', token)
        
        res.send({user, token})

    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router