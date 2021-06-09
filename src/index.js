const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");

require("./db/mongoose");  // run mongodb server

const portNumber = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // for parsing the application json

app.post('/users',async(req,res) =>{

    const user = new User(req.body);
    try{
       const result = await user.save();
       res.status(201).send(result)
    }catch(e){
        res,status(400).send(e)
    }

})

app.get('/users',async(req,res) => {

    try{
        const users = await User.find({});
        res.status(201).send(users);
    }catch(e){
        res.status(500).send(e);
    }
     
})

app.get('/users/:id', async(req,res) => {
    const id = req.params;
    try{
        const user = await User.findById({_id: id.id});
        if(!user){
            return res.status(400).send();
        }

        res.status(201).send(user);
    }catch(e){
        res.status(500).send();
    }
    
})

app.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowUpdates = ['name','email','password','age'];
    const isValidUpdate = updates.forEach((update) => {
        return allowUpdates.includes(update);
    })

    if(!isValidUpdate){
        return res.status(400).send({error: "invalid updates"})
    }

    const _id = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(_id,req.body,{new: true, runValidators: true})
        if(!user){
           return res.status(400).send()
        }

        res.status(401).send(user);
    }catch(e){
        res.status(500).send();
    }
   
})

app.delete('/users/:id',async(req, res) => {

    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send();
        }

        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
    
})

app.post('/tasks', async(req,res) => {
    const task = new Task(req.body);

    try{
        await task.save()
        res.status(201).send(task);
    }catch(e){
        res.status(400).sen(e);
    }
    
})

app.get('/tasks',async(req,res) => { 

    try{
        const tasks = await Task.find({});
        res.status(201).send(tasks);
    }catch(e){
        res.status(500).send("could not connected");
    }
    
})

app.get('/tasks/:id',(req,res) => { // async me nhi implement kiya baad me krunga
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

app.patch('/tasks/:id',async(req,res) => {

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

app.delete('/tasks/:id', async(req, res) => {
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
})

app.listen(portNumber,() => {
    console.log(`server is runnig on port 3000`)
})