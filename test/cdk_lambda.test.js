const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const CdkLambda = require('../lib/cdk_lambda-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkLambda.CdkLambdaStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
