var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'));

var addition = function(num1, num2){
    var result = num1 + num2;
    return result;
}

app.get('/test', function(req, res){
    var username = req.query.username;
    console.log("Yes, I've been hit by " + username);
    res.send('You hit me ' + username);
})

app.get('/addition', function(req, res){
    var num1 = parseInt(req.query.num1);
    var num2 = parseInt(req.query.num2);
    var result = addition(num1, num2);
    res.send('The result is: ' + result);
})

app.get('/home', function(req, res){
    res.sendFile('public/home.html', { root : __dirname});
})

var port = process.env.PORT || 8080;
app.listen(port)
console.log('Server listening on port ' + port)

















