const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
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
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

//getpublic info

budgetSchema.methods.toJSON = function(){
    const budget = this
    const budgetObject = budget.toObject()

    return budgetObject
}

const Budget = mongoose.model('budget', budgetSchema)
module.exports = Budget