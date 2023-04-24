const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const path = require('path')
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')
const { hostname } = require('os')

const router = new express.Router()

//email verification
// router.post('/api/verify', async (req, res)=>{

//     //get user based on email
//     const email = req.body.email
//     const user = await User.findOne({email})

//     //create verification token for the user
//     const verificationToken = jwt.sign({_id: user._id.toString() }, process.env.JWT_SECRET)
    
//     //save this token in the database
//     await user.updateOne({verificationToken:verificationToken})

//     const updatedUser = await User.findOne({email})

//     host=req.get('host')
//     link="http://"+req.get('host')+"/api/verify/?id="+verificationToken
//     console.log(link)

//     sgMail.setApiKey("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")

//     const msg = {
//         to: email, // Change to your recipient
//         from: 'rrmuddinagiri@gmail.com', // Change to your verified sender
//         subject: 'Verify your TimeCurrency email address',
//         text: 'Click on the link below to verify your email address',
//         html: '<a href="'+link+'">Verify!</a>',
//       }

//       sgMail
//         .send(msg)
//         .then(() => {
//             console.log(req.get(hostname))
//             console.log('Email sent')
           
//         })
//         .catch((error) => {
//             console.error(error)
//         })
        
//         res.end()
    

// })

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
                //res.sendStatus(200)
                
                //redirect to login page
                let host = req.get('host')
                host = host.slice(0, host.length-5)
                console.log('http://'+ host+":3000/emailverification")
                res.redirect('http://'+ host+":3000/emailverification")
            }
        } catch(error){
            //token not found for the user, ask to register again
            res.status(404).send({ error: error })
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
        const verificationToken = await user.generateVerififcationToken()

        host=req.get('host')
        link="http://"+req.get('host')+"/api/verify/?id="+verificationToken
        console.log(link)

        sgMail.setApiKey("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")

        const msg = {
            to: req_user.email, // Change to your recipient
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

        res.setHeader('Cache-Control', 'private');
        res.cookie('auth_token', token)
        res.status(201).send({user, token})
    } catch(e){
        console.log(e)
        res.status(400).send({ error: e })
    }
})

//log in
router.post('/api/auth/login', async (req, res) => {
    try{
        console.log(req.body)
        //find user by email id and password in req.body

        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user, req.body)
        //create token for the user
        console.log(req.body);

        const token = await user.generateAuthToken()
        console.log(token)
        res.cookie('auth_token', token)
        
        res.send({user, token})

    } catch(e) {
        console.log(e)
        res.status(400).send({ error: e })

    }
})


router.get('/api/auth/profile', auth,  (req, res)=>{
    try{
        if(!req.user){
            res.status(404).send("req.user not populated. User must log in")
        }
        let user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
        }
        res.status(200).send(user)
    } catch(e){
        res.status(500).send({ error: e })
    }
    
    
    //console.log(req.user._id, req.user.name, req.user.email)
    
   
})

//update profile
router.patch("/api/auth/updateProfile", auth, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        //send 404
        return res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: e });
    }
  });

//logout
router.post('/api/auth/logout', auth, async(req,res)=>{
    try{
        res.clearCookie('auth_token')
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        console.log(req.user.tokens)
        await req.user.save()
        res.status(200).send()
    }catch(e){
        res.status(500).send({ error: e })
    }
})

module.exports = router