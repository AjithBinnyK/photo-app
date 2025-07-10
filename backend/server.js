require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const s3 = new AWS.S3({
  region: 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

const BUCKET = 'ajith-photo-app';

app.get('/generate-upload-url', async (req, res) => {
  const fileName = `${Date.now()}-${req.query.filename}`;
  const params = {
    Bucket: BUCKET,
    Key: `uploads/${fileName}`,
    Expires: 60,
    ContentType: req.query.contentType,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  res.send({ uploadURL, key: fileName });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
