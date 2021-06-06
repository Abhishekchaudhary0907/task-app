const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");

require("./db/mongoose");  // run mongodb server

const portNumber = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // for parsing the application json

app.post('/users',(req,res) =>{
    const user = new User(req.body);
    
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users',(req,res) => {

    const users = User.find({});
    users.then((users) => {
        res.status(201).send(users)
    }).catch((e) => {
        res.status(500).send("could not find")
    })
    
})

app.get('/users/:id', (req,res) => {
    const id = req.params;
    User.findById({_id: id.id}).then((user) => {
        if(!user){
            return res.status(400).send()
        }

        res.status(201).send(user);
    }).catch(() => {
        res.status(500).send();
    })
})

app.post('/tasks', (req,res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/tasks', (req,res) => {

    const tasks = Task.find({});
    tasks.then((tasks) => {
        res.status(201).send(tasks)
    }).catch((e) => {
        res.status(500).send("could not reach to server")
    })
})

app.get('/tasks/:id',(req,res) => {
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

app.listen(portNumber,() => {
    console.log(`server is runnig on port 3000`)
})