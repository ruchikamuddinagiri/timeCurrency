const express = require('express')
const Task = require('../models/tasks')
const auth = require('../middleware/auth')
const path = require('path')

const router = new express.Router()

//create time budget
router.post('/api/addTask', auth, async (req, res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send({task})

    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

//get time budgets
router.get('/api/tasks', auth, async (req, res)=>{
    try{
        const tasks = await Task.find({owner: req.user._id})
        console.log(tasks)
        res.send({tasks})
    }
    catch(e){
        res.status(500).send()
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
        res.status(500).send()
    }
    
})

//update time budget
router.patch('/api/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
    
    if(!task){
        //send 404
        return res.status(404).send()
    }
    else{
    updates.forEach((update) => task[update] = req.body[update])
    await task.save()
    res.send(task)
    }
}
    catch(e){
        res.status(400).send({error:e})
    }
})
//delete time budget
router.delete('/api/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Budget.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!task){
            //task not found
            res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(400).send()
    }
})

module.exports = router