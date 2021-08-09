const cdk = require('@aws-cdk/core');
const myLambda = require('../lib/my_lambda');

class CdkLambdaStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new myLambda.MyLambda(this, 'MyLambda')
  }
}

module.exports = { CdkLambdaStack }
