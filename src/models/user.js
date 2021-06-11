const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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

userSchema.pre('save', async function(next){
    const user = this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10);
        
    }
    next();
})

// insatance method

userSchema.methods.findSimilarAge = function(cb){
    return mongoose.model("User").find({age: this.age}, cb);
}

const User = mongoose.model('User',userSchema);

module.exports = User;