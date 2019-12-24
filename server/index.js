const express = require('express');
const bodyParser = require('body-parser');
let helpers = require('../helpers/github');
let database = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  if (req.body.username) {
    helpers.getReposByUsername(req.body.username, (err, data) => {
      database.save(data.body, (err, result) => {
        if (err) {
          console.log("err")
        }

        console.log('d')
      });
    });
  } else {
    // return unprocessible entity to client
    res.sendStatus(422);

  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

