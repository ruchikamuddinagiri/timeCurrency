const mongoose = require('mongoose')
//process.env.MONGODB_URL
mongoose.connect("mongodb+srv://rmuddin:9uGBwgij2jFrkeWE@cluster0.yhha5m5.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true
})