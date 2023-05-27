const express = require('express')
const Task = require('../models/tasks')
const auth = require('../middleware/auth')
const path = require('path')
const axios = require("axios")
const { stringify } = require('querystring')

const router = new express.Router()


router.get("/api/affirmation", async (req, res)=>{
    try{
        await axios.get("https://www.affirmations.dev").then((response)=>{
            response = response.data
            res.status(200).send({response})
        }).catch((e)=>{
            console.log(e)
            res.status(500).send("It's not you, it's us.")
        })
    } catch(e){
        res.status(500).send("It's not you, it's us.")
    }
})

//create time budget
router.post('/api/addTask', auth, async (req, res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(200).send({task})

    } catch(error){
        console.log(error)
        res.status(500).send(error)
    }
})

//get time budgets
router.get('/api/tasks', auth, async (req, res)=>{
    try{
        console.log(req.user._id)
        const tasks = await Task.find({owner: req.user._id})
        console.log(tasks)
        res.send({tasks})
    }
    catch(e){
        res.status(500).send(e)
    }
})

//get particular time budget
router.get('/api/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
    } catch(e) {
        res.status(500).send(e)
    }
    
})

//update time budget
router.patch("/api/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      //send 404
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
});
//delete time budget
router.delete('/api/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!task){
            //task not found
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        console.log(e);
        res.status(500).send(e)
    }
})

module.exports = router