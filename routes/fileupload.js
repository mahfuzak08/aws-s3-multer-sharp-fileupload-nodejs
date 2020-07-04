const express = require('express')
const router = express.Router()
const { upload } = require('../helper/s3UploadClient')

router.get('/', (req, res) => {
  res.render('index');
})
// Upload a file
router.post('/upload', upload.array('inputFile', 3), (req, res) => {
  if (!req.files) res.status(400).json({ error: 'No files were uploaded.' })
	console.log(12, { message: 'Length ' + req.files.length, files: req.files });
var data = {
    message: 'Successfully uploaded ' + req.files.length + ' files!',
    files: req.files
  };
  res.render('files', data)
})

module.exports = router