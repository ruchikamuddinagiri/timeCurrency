const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
        trim: true,
    },
    description:{
        type: String, 
        trim: true,
    },
    category:{
        type: String,
        required: true, 
        trim: true,
    },
    status:{
        type: String,
        default: 'In Progress',
        required: true,
        trim: true
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

//getpublic info

taskSchema.methods.toJSON = function(){
    const task = this
    const taskObject = task.toObject()

    return taskObject
}

const Task = mongoose.model('task', taskSchema)
module.exports = Task