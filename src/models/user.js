const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Task = require('./task');

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
    },

    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar:{
        type: Buffer
    }
}

,{
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET,{expiresIn:"7 days"});
    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
}

userSchema.statics.findByCredential = async function(email, password){
    const user = await User.findOne({email});
    if(!user){
        throw new Error("email not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("password is not match");
    }

    return user;
}

userSchema.methods.toJSON = function() {
    const user = this; 
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.pre('save', async function(next){
    const user = this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10);
        
    }
    next();
})

// remove user tasks before removing user

userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner: user._id})
})
// insatance method

userSchema.methods.findSimilarAge = function(cb){
    return mongoose.model("User").find({age: this.age}, cb);
}

const User = mongoose.model('User',userSchema);

module.exports = User;