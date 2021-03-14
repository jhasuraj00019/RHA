const express = require('express')
const app = express();
const port = process.env.PORT || 5555;
const mongo = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = mongo.MongoClient;
const url = "mongodb+srv://second:mongo321@cluster0.khewj.mongodb.net/assignment4?retryWrites=true&w=majority";
// const url = "mongodb://localhost:27017";
let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("health Ok")
})


/////////Branch///////////

////////////////Branch according to the Area//////////

app.get('/city/:area', (req, res) => {
    var areaName = req.params.area
    db.collection('branch').find({area: areaName}).toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/city', (req,res) => {
    db.collection('branch').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})




// >>>>>>>>>>>>>>>>>Events<<<<<<<<<<<<<<<<

// >>>>>EVENT UPDATES<<<
app.post('/addEvent', (req,res) => {
    db.collection('events').insert(req.body, (err, result) => {
        if(err) throw err;
        res.status(200).send("Data Added")
    })
})
// >>>>>>>>>>Get Event Data<<<<<<<<<<<< 
app.get('/event', (req, res)=> {
    db.collection('events').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
})




// >>>>>>>>>>>>>Drive<<<<<<<<<<<<<<<<<

// >Add Next Drive Info>>
app.post('/nextDrive', (req, res) => {
    db.collection('drive').insert(req.body, (err, result) =>{
        if(err) throw err;
        res.status(200).send("Data Added")
    })
})
//Get Drive Data<<<<<<<<<<
app.get('/drive', (req, res) => {
    db.collection('drive').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
})



// >>>>>>>>>>>>>>>FoodCalls<<<<<<<<<<<<<<<

//>>>>Add Food Call Datas<<<<<<
app.post('/foodCallUpdate', (req, res) => {
    db.collection('foodCall').insert(req.body, (err, result) => {
        if(err) throw err;
        res.send(result)
    })
})
//Get Food Call Datas
app.get('/foodcall', (req, res) => {
    db.collection('foodCall').find().toArray((err, result) => {
        if(err) throw err;
        res.send(result)
    })
})

//////////////Connection with mongoDb//////////

MongoClient.connect(url, (err,connection) => {
    if(err) throw err;
    db = connection.db('RHA');

    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`)
    })
})

