const express = require('express')
const Post = require('../models/post')
const auth = require('../middleware/auth')
const path = require('path')


const router = new express.Router()

//create post
router.post('/api/addPost', auth, async (req, res)=>{
    const content = req.body.content
    console.log(req.body.content)
    const post = new Post({
        owner: req.user.name,
        publish: true,
        content: content
    })
    try{
        await post.save()
        res.status(200).send({post})
    } catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

//retreive post
router.get('/post/:id', auth, async (req, res)=>{
    const _id = req.params.id
    try{
        const task = await Task.find({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
    } catch(e){
        res.status(500).send(e)
    }
})

//get all posts
router.get('/api/posts', auth, async (req, res)=>{
    try{
        //get all published posts
        const posts = await Post.find({"published": true})
        res.status(200).send({posts})
    } catch(e){
        console.log(e)
        res.status(500).send({error: e})
    }
})

module.exports = router