const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect(`mongodb://localhost/fetcher`, { useMongoClient: true }, function (err, db) {
  if (err) throw err;
  console.log(`database fetcher was created`);
});
mongoose.connection.once("open", () => {
  console.log("the connection was made")
}).on("error", (error) => {
  console.log("faild to connect to database")
})


let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
  description: String
});

let Repo = mongoose.model('Repo', repoSchema);
let save = (repobj) => {
  return new Promise((resolve, reject) => {
    Repo.collection.insertMany(repoes, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })

  })
}
let findRepo = (userName) => {
  return Repo.find({ userName: userName })
}
module.exports.save = save;
module.exports.findRepo = findRepo;