let express = require("express");
let app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);

const bodyParser = require('body-parser');
//const { title } = require("process");
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');


var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const project = {
  imageUrl: 'https://i.redd.it/c3uhsgo1vx541.jpg',
  uniqueID: '1',
  description: 'I like video games',
  title: 'My Website'
}
let projectData = [project]

/*app.get('/home', (req, res)=> {
  res.sendFile('public/home.html', { root: __dirname });
})*/


app.get('/api/projects', (req, res) => {
  console.log('projects requested')

  //get project from database
  getProjects(res);
})

app.post('/api/projects', (req, res) => {
  console.log("New project posted")
  console.log('body', req.body)
  let project = req.body;
  insertProject(project, res)
})

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);

});


http.listen(port, () => {
  console.log("Listening on port ", port);
});

console.log('Server listening on port ' + port)

//Database connection

const uri = "mongodb+srv://admin:admin@cluster0.kee8v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var projectsCollection;


//open connection
const openConnection = (message) => {
  client.connect(err => {
    projectsCollection = client.db("myFirstDatabase").collection("projects");
    // perform actions on the collection object
    client.close();
  });
}

//insert project to db
const insertProject = (project, res) => {
  projectsCollection.insert(project, (err, result) => {
    console.log('Project inserted', result)
    res.send({ result: 200 })
  })
}

//get projects
const getProjects = (res) => {
  projectsCollection.find().toArray(function (err, result) {
    if (err) throw err;
    res.send(result)
  })
}

openConnection()


