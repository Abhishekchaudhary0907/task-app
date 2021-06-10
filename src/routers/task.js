const express = require('express');
const Task = require("../models/task");
const router = new express.Router();


router.post('/tasks', async(req,res) => {
    const task = new Task(req.body);

    try{
        await task.save()
        res.status(201).send(task);
    }catch(e){
        res.status(400).sen(e);
    }
    
})

router.get('/tasks',async(req,res) => { 

    try{
        const tasks = await Task.find({});
        res.status(201).send(tasks);
    }catch(e){
        res.status(500).send("could not connected");
    }
    
})

router.get('/tasks/:id',(req,res) => { // async me nhi implement kiya baad me krunga
    const id = req.params;

    Task.findById({_id: id.id}).then((task) => {

        if(!task){
            return res.status(400).send();
        }

        res.status(201).send(task);
    }).catch(() => {
        res.status(500).send();
    })
})

router.patch('/tasks/:id',async(req,res) => {

    const updates = Object.keys(req.body);
    const validUpdate = ['description','completed'];
    const isValidUpdate = updates.forEach((update) => {
        return validUpdate.includes(update);
    })
    if(!isValidUpdate){
        return res.status(400).send({error:"invalid updates!"})
    }

    const _id = req.params.id;
  
  try{
    const task = await Task.findByIdAndUpdate(_id, req.body,{new: true,runValidators: true})

    if(!task){
        res.status(400).send();
    }
    res.status(201).send(task)
  }catch(e){
        res.status(500).send(e)
  }
  
})

router.delete('/tasks/:id', async(req, res) => {
    const _id = req.params.id;

    try{

        const task = await Task.findByIdAndDelete(_id);
        if(!task){
            return res.status(404).send()
        }
        res.send(task);

    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;