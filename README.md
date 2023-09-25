# Welcome to your CDK JavaScript project!

This is a blank project for JavaScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

 * `npm run test`         perform the jest unit tests
 * `cdk deploy`           deploy this stack to your default AWS account/region
 * `cdk diff`             compare deployed stack with current state
 * `cdk synth`            emits the synthesized CloudFormation template


# AWS CDK Lambda and Step Function Example

This AWS CDK project demonstrates the creation of an AWS Lambda function and a Step Function using the AWS Cloud Development Kit (CDK). The Lambda function resizes images uploaded to an S3 bucket and copies them to another S3 bucket, while the Step Function orchestrates this process.

## Prerequisites

Before you begin, ensure you have the following prerequisites:

1. AWS CDK Installed: Make sure you have the AWS CDK installed globally. You can install it using npm:

    ```shell
    npm install -g aws-cdk
    ```

2. AWS CLI Configuration: Ensure you have AWS CLI configured with appropriate credentials and default region.

## Deployment

Follow these steps to deploy the AWS CDK project:

1. Clone the repository and navigate to the project folder.

2. Install project dependencies:

    ```shell
    npm install
    ```

3. Deploy the CDK stack:

    ```shell
    cdk deploy
    ```

4. After deployment, the AWS CDK will create the Lambda function, S3 buckets, and Step Function. Make note of the Step Function ARN printed in the console.

## Usage

To use the deployed AWS CDK stack:

1. Upload an image file to the source S3 bucket (configured during deployment).

2. The Lambda function will automatically resize the image to 300x200 pixels and copy it to the destination S3 bucket.

3. The Step Function orchestrates this process and monitors the execution.

## Clean Up

To remove the AWS CDK stack and its resources, run:

```shell
cdk destroy

