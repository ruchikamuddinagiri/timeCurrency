const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const path = require('path')
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')

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

//email verification
router.post('/api/verify', async (req, res)=>{

    //get user based on email
    const email = req.body.email
    const user = await User.findOne({email})

    //create verification token for the user
    const verificationToken = jwt.sign({_id: user._id.toString() }, process.env.JWT_SECRET)
    
    //save this token in the database
    await user.updateOne({verificationToken:verificationToken})

    const updatedUser = await User.findOne({email})

    host=req.get('host')
    link="http://"+req.get('host')+"/api/verify/?id="+verificationToken
    console.log(link)

    sgMail.setApiKey("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")

    const msg = {
        to: email, // Change to your recipient
        from: 'rrmuddinagiri@gmail.com', // Change to your verified sender
        subject: 'Verify your TimeCurrency email address',
        text: 'Click on the link below to verify your email address',
        html: '<a href="'+link+'">Verify!</a>',
      }

      sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
        res.end()
    

})

//verify user
router.get('/api/verify', async (req, res)=>{
    token =  req.query.id
    console.log(token)
    let user = {}
    if(token){
        try{
            //get verificationToken from the database
            //verify jwt
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            user = await User.findById(decode)
            if(user){
                console.log("user verified")
                //change active status to true and delete the verificationToken
                await user.updateOne({active:true})
                user.verificationToken =  undefined
                user.save()
                //verified
                res.sendStatus(200)
                
                //redirect to login page
                //res.redirect(req.get('host')+":3000/login")
            }
        } catch(error){
            //token not found for the user, ask to register again
            res.sendStatus(404)
            //res.redirect(req.get(host)+":3000/register")
        }
    }

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