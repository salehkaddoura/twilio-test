var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var client = require('twilio')('ACb823a8d67e74c969788db57ac1f97ae4', '172ef55c130b6ce63f2d47033e4e959a');

var port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.json({ message: 'TWILIO TEST' });
});

app.post('/twilio', function(req, res) {
    var phoneNmber = req.query.number;
    var message = req.body.message;

    client.messages.create({
        to: phoneNmber,
        from: '+16507276529',
        body: message,
    }, function(err, message) {
        if (!err) {
            res.json(message.sid);
        } else {
            res.status(400).json(err);
        }
    });
});

app.listen(port);
console.log('Magic happens on port: ' + port);