const express = require('express')
const Budget = require('../models/timeBudget')
const auth = require('../middleware/auth')
const path = require('path')

const router = new express.Router()

//create time budget
router.post('/api/auth/addTask', auth, async (req, res)=>{
    const budget = new Budget({
        ...req.body,
        owner: req.user._id
    })

    try{
        await budget.save()
        res.status(201).send({budget})

    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

//get time budgets
router.get('/api/auth/budgets', auth, async (req, res)=>{
    try{
        const budgets = await Budget.find({owner: req.user._id})
        console.log(budgets)
        res.send({budgets})
    }
    catch(e){
        res.status(500).send()
    }
})

//get time budget
router.get('/api/auth/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Budget.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
    } catch(e) {
        res.status(500).send()
    }
    
})

//update time budget
router.patch('/api/auth/tasks/:id', async (req, res) => {
    try{
        const task = await Budget.findOne({_id: req.params.id, owner: req.user._id})
    
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
router.delete('/api/auth/tasks/:id', auth, async (req, res) => {
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