const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-app-api",{
    useNewUrlParser: true,
     useCreateIndex:true
})

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
        
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("please provide valid email");
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim : true,
        validate(value){
            if(value.length < 6){
                throw new Error("password should be greater than 6")
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
})

userSchema.methods.findSimilarAge = function(cb){
    return mongoose.model("User").find({age: this.age}, cb);
}

const User = mongoose.model('User',userSchema);
// create a instance method which will work all of the User

const me = new User({
    name:"frodo",
    email:"frodo@gmail.com",
    password:"frodowaagins123",
    age:19
})

me.findSimilarAge((err, me) => {
    console.log(me)
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