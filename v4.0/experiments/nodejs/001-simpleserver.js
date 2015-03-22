var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.use(express.static(__dirname + '/public'));

var login = [
    {
        username: 'adib', password: 'adib', application: [
          { name: 'Word' },
          { name: 'Excel' },
          { name: 'Powerpoint' },
        ]
    },
    { username: 'admin', password: 'admin', application: [] },
    { username: 'root', password: 'root', application: [] }
];

app.get('/login', function (req, res) {
    res.json(login);
});

app.get('/login/:index', function (req, res) {
    var idx = req.params.index; // or req.params['index'];
    res.json(login[idx]);
});

app.post('/login', function (req, res) {
    var obj = req.body;
    login.push(obj);
    res.json(login);
});

app.put('/login/:index', function (req, res) {
    var index = req.params.index;
    login[index] = req.body;
    res.json(login);
});

app.delete('/login/:index', function (req, res) {
    var idx = req.params.index;
    login.splice(idx, 1);
    res.json(login);
});

app.get('/login/:index/application', function (req, res) {
    var idx = req.params.index; // or req.params['index'];
    res.json(login[idx].application);
});

app.get('/login/:index/application/:appIndex', function (req, res) {
    var idx = req.params.index; // or req.params['index'];
    var appIdx = req.params.appIndex;

    res.json(login[idx].application[appIdx]);
});

app.get('/bye', function (req, res) {
    res.send('Good Bye');
});

app.listen(3000);