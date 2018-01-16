let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let user = require('./app/routes/user.route');

//db options
let options = {
	useMongoClient: true,
	autoIndex: false, 
	reconnectTries: Number.MAX_VALUE, 
	reconnectInterval: 500, 
	poolSize: 10, 
	bufferMaxEntries: 0
};

//db connection  
mongoose.Promise = Promise;
let db = mongoose.connect('mongodb://localhost/lensod',options);    
                                      
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route("/api/user")
    .get(user.getUsers)
    .post(user.postUser);
app.route("/api/user/:id")
    .get(user.getUser)
    .put(user.updateUser);

app.listen(3000);
console.log("Listening on port 3000");

module.exports = app;