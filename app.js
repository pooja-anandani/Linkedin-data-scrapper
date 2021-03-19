const { LinkedInProfileScraper } = require('linkedin-profile-scraper')
var express = require('express');
var cors = require("cors")
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use(express.static("public"))
app.post('/', function (req, res) {
    const scraper = new LinkedInProfileScraper({
        sessionCookieValue: req.body.cookies,
        keepAlive: false
    });
    scraper.setup().then(() => {
        scraper.run(req.body.url).then((result) => {

            fs.writeFile('./public/' + result.userProfile.fullName + '.html', JSON.stringify(result), function (err, file) {
                if (err) throw err;
                console.log('Saved!');
                // return res.send({ 'userfile': result.userProfile.fullName + '.html' });
                return res.send(result)

            });
        });
    })
})
var server = app.listen(3019, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})