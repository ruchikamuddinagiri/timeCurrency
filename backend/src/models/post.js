const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    publish:{
      type: Boolean,
      default: false

    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

//getpublic info

postSchema.methods.toJSON = function(){
    const post = this
    const postObject = post.toObject()

    return postObject
}

const Post = mongoose.model('post', postSchema)
module.exports = Post