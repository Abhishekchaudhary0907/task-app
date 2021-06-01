const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const url = "mongodb://127.0.0.1:27017";
const databseName = "task-app-api";

MongoClient.connect(url,{useUnifiedTopology:true},(error,client) => {
    if(error){
        return console.log("coudnt connected");
    }

    const db = client.db(databseName);

    db.collection("users").insertMany([
    {
           name:"jack",
          age:28},
    {
        name:"abhi",
        age:23
    },
    {
        name:"nammu",
        age:21
    },{
        name:"nam",
        age:11
    }
    ]).then((result) => {
        console.log("document inserted")
    }).catch((error) => {
        console.log("error")
    })

    db.collection("users").findOne({_id: new ObjectID("60b5fa1a99527d38283980f1")})
    .then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log("cant connect");
    })

    db.collection("users").updateOne({_id: new ObjectID("60b5fa1a99527d38283980f1")},
    {
        $set:{
            name:"abhis"
        },

        $inc:{               // increase age by 88
            age:88
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log("error")
    })

    db.collection("tasks").updateMany({completed:"false"},
    {
        $set:{
            completed:"true"
        }
    }
    
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log("error")
    })

})