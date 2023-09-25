const core = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
const eventsources = require("@aws-cdk/aws-lambda-event-sources");
const stepfunctions = require("@aws-cdk/aws-stepfunctions");
const tasks = require("@aws-cdk/aws-stepfunctions-tasks");
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

class MyLambda extends core.Construct {
  constructor(scope, id) {
    super(scope, id);

    const sourcebucket = s3.Bucket.fromBucketName(this, "ExistingBucket", process.env.REACT_APP_SOURCEBUCKET);
    const destbucket = s3.Bucket.fromBucketName(this, "ExistingBucket2", process.env.REACT_APP_DESTBUCKET);

    const deploymentPackage = './builder/Archive.zip';

    const handler = new lambda.Function(this, "Handler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(deploymentPackage),
      handler: "lambda.main",
      functionName: 'ResizingImageFunction',
      bundling: {
          nodeModules: ["sharp"]
      },
      environment: {
        SOURCEBUCKET: sourcebucket.bucketName,
        DESTBUCKET: destbucket.bucketName
      },
    });

    sourcebucket.grantReadWrite(handler);
    destbucket.grantReadWrite(handler);

    const s3EventSource = new eventsources.S3EventSource(sourcebucket, {
      events: [s3.EventType.OBJECT_CREATED_PUT],
    });

    handler.addEventSource(s3EventSource);
    // Define a Step Function
    const definition = new stepfunctions.Pass(this, "InvokeLambda", {
      result: stepfunctions.Result.fromObject({ status: "Lambda Invoked" }),
    });

    const lambdaTask = new tasks.LambdaInvoke(this, "InvokeLambdaTask", {
      lambdaFunction: handler,
      resultPath: "$.lambdaOutput",
    });

    definition.next(lambdaTask);

    const stateMachine = new stepfunctions.StateMachine(this, "MyStepFunction", {
      definition,
      timeout: core.Duration.minutes(5),
    });

    // Optionally, grant permissions to the Step Function to invoke the Lambda function
    handler.grantInvoke(stateMachine);

    // Output the ARN of the Step Function for reference
    new core.CfnOutput(this, "StepFunctionArn", {
      value: stateMachine.stateMachineArn,
    });
  }
}

module.exports = { MyLambda }