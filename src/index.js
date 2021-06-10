const express = require("express");
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

require("./db/mongoose");  // run mongodb server

const portNumber = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // for parsing the application json

app.use(userRouter);
app.use(taskRouter);

app.listen(portNumber,() => {
    console.log(`server is runnig on port ${portNumber}`)
})