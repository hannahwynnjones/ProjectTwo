const S3 = require('aws-sdk/clients/s3');

module.exports = new S3({
  region: 'eu-west-1',
  params: { Bucket: 'wdilondonbucket'},
  credentials: {
    accessKeyId: process.env.P2_AWS_ACCESS_KEY,
    secretAccessKey: process.env.P2_AWS_SECRET_KEY
  }
});
