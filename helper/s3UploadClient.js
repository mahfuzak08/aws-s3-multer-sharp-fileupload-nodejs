const aws = require('aws-sdk')
var Minio = require('minio');
const multer = require('multer')
const multerS3 = require('multer-s3-transform')
const sharp = require('sharp')
var stream = require('stream')
var path = require('path')

const s3 = new aws.S3({
	"endpoint": process.env.S3_END_POINT,
	"accessKeyId": process.env.S3_ACCESS_KEY,
	"secretAccessKey": process.env.S3_SECRET_KEY,
	"region": "us-east-1",
	"s3ForcePathStyle": true
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'test-test-com',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
	shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype))
    },
	key: function (req, file, cb) {
		var filename = file.originalname.replace(path.extname(file.originalname), '@') + Date.now() +  path.extname(file.originalname);
		file.originalname = filename;
        cb(null, filename);
    },
    transforms: [{
      id: 'original',
      key: function (req, file, cb) {
        cb(null, file.originalname);
      },
      transform: function (req, file, cb) {
        cb(null, new stream.PassThrough())
      }
    }, {
      id: 'thumbnail',
      key: function (req, file, cb) {
        cb(null, 'thumb-' + file.originalname)
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize({width:50, sigma:0.3}).png())
      }
    }]
  })
});
module.exports = {
  upload
}