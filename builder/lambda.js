const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const sharp = require('sharp');

exports.main = async function(event, context) {
  try {
    const sourceBucketName = process.env.SOURCEBUCKET;
    const destinationBucketName = process.env.DESTBUCKET;

    console.log("Entering Lambda!");
    const data = await S3.listObjectsV2({ Bucket: sourceBucketName }).promise();
    console.log(data);
    console.log("Starting");

      const sourceObjectKey = event.Records[0].s3.object.key;

      console.log("Image copied from " + sourceBucketName + " to " + destinationBucketName + ": " + sourceObjectKey);

      const imageBuffer = await S3.getObject({ Bucket: sourceBucketName, Key: sourceObjectKey }).promise();
      const resizedImageBuffer = await sharp(imageBuffer.Body)
        .resize({ width: 300, height: 200 })
        .toBuffer();

      await S3.putObject({
        Bucket: destinationBucketName,
        Key: sourceObjectKey,
        Body: resizedImageBuffer,
      }).promise();

    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify("Images copied and resized successfully"),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(`Error: ${error.message}`),
    };
  }
};
