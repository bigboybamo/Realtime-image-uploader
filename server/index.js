const express = require('express');
const multipart = require('connect-multiparty');
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary');
const cors = require('cors');
const Datastore = require('nedb');
const Pusher = require('pusher');
const paths = require('./paths');
const PORT = process.env.PORT || 3001;

const app = express();
const multipartMiddleware = multipart();
const db = new Datastore()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(paths.paths.Pusher_AppId)
//1045127

// Pusher configuration
const pusher = new Pusher({
  appId: paths.paths.Pusher_AppId,
  key: paths.paths.Pusher_Key,
  secret: paths.paths.Pusher_Secret,
  encrypted: true,
  cluster: paths.paths.Pusher_Cluster
});

// Cloudinary configuration
cloudinary.config({
    cloud_name: paths.paths.CL_Cloud_Name,
    api_key: paths.paths.Cl_Key,
    api_secret: paths.paths.Cl_Secret
});

app.get('/', (req, res) => {
  db.find({}, function (err, docs) {
    if(err) {
      return res.status(500).send(err);
    }
    res.json(docs)
  });
})

app.post('/upload', multipartMiddleware, function(req, res) {
    console.log(req.body, req.files);
  cloudinary.v2.uploader.upload(
    req.files.image.path,
    { /* Transformation if needed */ },
    function(error, result) {
      if(error) {
        res.status(500).send(error)
      }
      db.insert(Object.assign({}, result, req.body), (err, newDoc) => {
        if(err) {
          return res.status(500).send(err);
        }
        pusher.trigger('gallery', 'upload', newDoc);
        res.status(200).json(newDoc)
      })
  })
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`))