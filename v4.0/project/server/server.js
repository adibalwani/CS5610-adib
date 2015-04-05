var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var app = express();

var mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/carpool';

mongoose.connect(mongo_url);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '../'));

/**************************************mongodb/000-savemongo************************************/

var favoriteSchema = new mongoose.Schema({
    userId: String,
    userIdFavorite: String
}, { collection: 'favorite' });

var favoriteModel = mongoose.model("FavoriteModel", favoriteSchema);

app.post('/v1/users/favorite', function (req, res) {
    var favorite = new FavoriteModel(req.body);
    favorite.save(function () {
        FavoriteModel.find(function (err, data) {
            res.json(data);
        });
    });
});

//var commentModel = mongoose.model("CommentModel", commentSchema);

//var commentSchema = new mongoose.Schema({
//    username: String,
//    text: String
//}, { collection: 'comment' });

//app.get('/mongodb/000-comment', function (req, res) {
//    commentModel.find(function (err, data) {
//        res.json(data);
//    });
//});

//app.post('/mongodb/000-comment', function (req, res) {
//    var comment = new commentModel(req.body);
//    comment.save(function () {
//        commentModel.find(function (err, data) {
//            res.json(data);
//        });
//    });
//});

//app.post('/mongodb/000-update', function (req, res) {
//    var username = req.body.username;
//    userModel.update({ username: username }, { $set: req.body }, function (err, data) {
//        userModel.find(function (err, data) {
//            res.json(data);
//        });
//    });
//});

//app.post('/mongodb/000-login', function (req, res) {
//    var username = req.body.username;
//    var password = req.body.password;

//    userModel.find({username: username, password: password}, function (err, data) {
//        res.json(data);
//    });
//});

///**************************************mongodb/002-signupsave************************************/

//app.post('/mongodb/002-signup', function (req, res) {
//    var username = req.body.username;
//    var password = req.body.password;
//    var email = req.body.email;
//    var firstName = req.body.firstName;
//    var lastName = req.body.lastName;
//    var photo = req.body.photo;

//    userModel.find({ username: username }, function (err, data) {
//        if (data.length > 0) {
//            res.json({ response: 'false' });
//        } else {
//            new userModel({
//                username: username,
//                password: password,
//                email: email,
//                firstName: firstName,
//                lastName: lastName,
//                photo: photo
//            }).save(function (err, data) {
//                res.json({ response: 'true' });
//            });
//        }
//    });

//});

///**************************************004-comment************************************/

//var users = [
//        { username: "adib", password: "adib", email: "alwani.a@husky.neu.edu", firstName: "Adib", lastName: "Alwani", photo: "" },
//        { username: "root", password: "root", email: "root@husky.neu.edu", firstName: "Root", lastName: "Admin", photo: "" },
//        { username: "admin", password: "admin", email: "admin@husky.neu.edu", firstName: "Admin", lastName: "Root", photo: "" }
//];

//var comments = [{ username: "adib", text: "First Comment" }];

//app.get('/004-comment', function (req, res) {
//    res.json(comments);
//});

//app.post('/004-comment', function (req, res) {
//    comments.push(req.body);
//    res.json(comments);
//});

///**************************************002-save************************************/

//app.post('/002-update', function (req, res) {

//    var user = req.body;
//    var currentUser = null;

//    for (var index in users) {
//        if (users[index].username == user.username) {
//            users[index].firstName = user.firstName;
//            users[index].lastName = user.lastName;
//            users[index].email = user.email;
//            users[index].password = user.password;
//            users[index].photo = user.photo;
//            currentUser = users[index];
//        }
//    }

//    res.json(currentUser);
//});

///**************************************001-profile************************************/

//app.post('/001-login', function (req, res) {
//    var username = req.body.username;
//    var password = req.body.password;
//    var currentUser = null;

//    for (var index in users) {
//        if (users[index].username == username && users[index].password == password) {
//            currentUser = users[index];
//        }
//    }
//    res.json(currentUser);
//});

///**************************************000-clientApp************************************/

//app.get('/', function (req, res) {
//    res.send('Hello World');
//});

//var login = [
//    {
//        username: 'adib', password: 'adib', application: [
//          { name: 'Word' },
//          { name: 'Excel' },
//          { name: 'Powerpoint' },
//        ]
//    },
//    { username: 'admin', password: 'admin', application: [] },
//    { username: 'root', password: 'root', application: [] }
//];

//app.get('/login', function (req, res) {
//    res.json(login);
//});

//app.get('/login/:index', function (req, res) {
//    var idx = req.params.index; // or req.params['index'];
//    res.json(login[idx]);
//});

//app.post('/login', function (req, res) {
//    var obj = req.body;
//    login.push(obj);
//    res.json(login);
//});

//app.put('/login/:index', function (req, res) {
//    var index = req.params.index;
//    login[index] = req.body;
//    res.json(login);
//});

//app.delete('/login/:index', function (req, res) {
//    var idx = req.params.index;
//    login.splice(idx, 1);
//    res.json(login);
//});

//app.get('/login/:index/application', function (req, res) {
//    var idx = req.params.index; // or req.params['index'];
//    res.json(login[idx].application);
//});

//app.get('/login/:index/application/:appIndex', function (req, res) {
//    var idx = req.params.index; // or req.params['index'];
//    var appIdx = req.params.appIndex;

//    res.json(login[idx].application[appIdx]);
//});

//app.get('/bye', function (req, res) {
//    res.send('Good Bye');
//});

/**********************************************************************************/

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);