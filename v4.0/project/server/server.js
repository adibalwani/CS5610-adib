/////////////////////////////////////////////////////////////////////////////////////////////////
/*Initial Setup*/

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

app.use(express.static(__dirname + '/public'));

/*Allow CORS request*/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Database Schema*/

var favoriteSchema = new mongoose.Schema({
    userId: String,
    userIdFavorite: String
}, { collection: 'favorite' });

var reviewSchema = new mongoose.Schema({
    userId: String,
    userIdReview: String,
    rating: String,
    review: String
}, { collection: 'review' });

var favoriteModel = mongoose.model("FavoriteModel", favoriteSchema);
var reviewModel = mongoose.model("ReviewModel", reviewSchema);

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Favorite Module*/

/*Add to Favorites*/
app.post('/v1/:userId/favorite/:userIdFavorite/add', function (req, res) {
    var favorite = new favoriteModel({
        userId: req.params.userId,
        userIdFavorite: req.params.userIdFavorite
    });
    favoriteModel.find({ userId: req.params.userId, userIdFavorite: req.params.userIdFavorite }, function (err, data) {
        if (data.length == 0) {
            favorite.save(function () {
                res.status(200).json(favorite);
            });
        } else {
            res.status(422).json({error: "User is already favorited"});
        }
    });
});

/*Remove from Favorites*/
app.post('/v1/:userId/favorite/:userIdFavorite/remove', function (req, res) {
    favoriteModel.remove({ userId: req.params.userId, userIdFavorite: req.params.userIdFavorite }, function (err, data) {
        if (data > 0) {
            res.status(200).json({ message: "Successfully Removed" });
        } else {
            res.status(404).json({ error: "No relationship found" });
        }
    });
});

/*Get favorites of this userId*/
app.get('/v1/:userId/favorite', function (req, res) {
    favoriteModel.find({ userId: req.params.userId }, function (err, data) {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "User has not favorited anyone" });
        }
    });
});

/*Get who favors this userId*/
app.get('/v2/:userId/favorite', function (req, res) {
    favoriteModel.find({ userIdFavorite: req.params.userId }, function (err, data) {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "User has not been favorited by anyone" });
        }
    });
});

/*Check if userId has favored userIdFavorite*/
app.get('/v1/:userId/favorite/:userIdFavorite', function (req, res) {
    favoriteModel.find({ userId: req.params.userId, userIdFavorite: req.params.userIdFavorite }, function (err, data) {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "User has not favored the other user" });
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/*Review Module*/

/*Add Review*/
app.post('/v1/:userId/review/:userIdReview/add', function (req, res) {
    var review = new reviewModel({
        userId: req.params.userId,
        userIdReview: req.params.userIdReview,
        review: req.body.review,
        rating: req.body.rating
    });
    reviewModel.find({ userId: req.params.userId, userIdReview: req.params.userIdReview }, function (err, data) {
        if (data.length == 0) {
            review.save(function () {
                res.status(200).json(review);
            });
        } else {
            res.status(422).json({ error: "User has already reviewed" });
        }
    });
});

/*Remove Review*/
app.post('/v1/:userId/review/:userIdReview/remove', function (req, res) {
    reviewModel.remove({ userId: req.params.userId, userIdReview: req.params.userIdReview }, function (err, data) {
        if (data > 0) {
            res.status(200).json({ message: "Successfully Removed" });
        } else {
            res.status(404).json({ error: "No relationship found" });
        }
    });
});

/*Get reviews posted for this user*/
app.get('/v1/:userId/review', function (req, res) {
    reviewModel.find({ userIdReview: req.params.userId }, function (err, data) {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "User has not been reviewed" });
        }
    });
});

/*Get reviews posted by this user*/
app.get('/v2/:userId/review', function (req, res) {
    reviewModel.find({ userId: req.params.userId }, function (err, data) {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: "User has not reviewed anyone" });
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////
/*IP and Port Setup*/

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);