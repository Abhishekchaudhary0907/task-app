const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-app-api",{
    useUnifiedTopology: true,
    useCreateIndex:true
})

const User = mongoose.model('User',{
    name:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){

                throw new Error("please provide valid email");
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("age can not be negative")
            }
        }
    }
});

const me = new User({
    name:"abhi",
    age:1,
    email:"abihi@gmail.com"
})

me.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log("error")
})

// const Task = mongoose.model("Task",{
//     description: {
//         type: String
//     },

//     completed:{
//         type: Boolean
//     }
     
// });

// const task = new Task({
//     description:"taking bath",
//     completed:true
// });

// task.save().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log("not inserted")
// });