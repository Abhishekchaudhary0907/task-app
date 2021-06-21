const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    description:{
        type: String,
        required: true,

    },

    completed:{
        type: Boolean,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// taskSchema.methods.populateByCredential = function(){
    
// }

taskSchema.query.byName = function(description){
    return this.where({description})
}

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;