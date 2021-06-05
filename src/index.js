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
        res.send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.post('/tasks', (req,res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})
app.listen(portNumber,() => {
    console.log(`server is runnig on port 3000`)
})