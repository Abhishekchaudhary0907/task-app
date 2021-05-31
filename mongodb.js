const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const url = "mongodb://127.0.0.1:27017";
const databseName = "task-app-api";

const id = new ObjectID();
console.log(id);
console.log(id.id);

MongoClient.connect(url,{useUnifiedTopology:true},(error,client) => {
    if(error){
        return console.log("coudnt connected");
    }

    const db = client.db(databseName);

    db.collection("tasks").insertOne({
        description:"take bath",
        completed:"true"
    },(error,result) => {
        if(error){
            return console.log("nothing there");
        }

        console.log(result.ops);
    })

    db.collection("tasks").insertMany([
        {
            description:"attendence",
            completed:"true"
        },
        {
            description:"dinner",
            completed:"true"
        },
        
    ],(error,result) => {
        if(error){
            return console.log("can not be done");
        }

        console.log(result.ops);
    })
})