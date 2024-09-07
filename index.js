var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function(req, res) {
    let dateParam = req.params.date;
    let date;

    if (!dateParam) {
        date = new Date();
        console.log(date)
    } else {
        if (!isNaN(dateParam)) {
            date = new Date(parseInt(dateParam));
            console.log(date)
        } else {
            date = new Date(dateParam);
            console.log(date)
        }
    }


    if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
    } else {
        return res.json({
            unix: date.getTime(),
            utc: date.toUTCString()
        });
    }
});

var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});