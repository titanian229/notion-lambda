const path = require("path");

const cdk = require("aws-cdk-lib");
const { NodejsFunction } = require("aws-cdk-lib/aws-lambda-nodejs");
// const ssm = require("aws-cdk-lib/aws-ssm")
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");

// const sns = require('aws-cdk-lib/aws-sns');
// const subs = require('aws-cdk-lib/aws-sns-subscriptions');
// const sqs = require('aws-cdk-lib/aws-sqs');

class NotionLambdaStack extends cdk.Stack {
  /**
   * @param {cdk.App} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log(__dirname);

    const secret = secretsmanager.Secret.fromSecretAttributes(this, "notionKey", {
      secretCompleteArn: "arn:aws:secretsmanager:ca-central-1:958125841072:secret:notionKey-qP0gQE",
    });

    const notionLambda = new NodejsFunction(this, "notion-lambda", {
      description: "Lambda for running CRON jobs in Notion",
      memorySize: 1024,
      timeout: cdk.Duration.minutes(5),
      runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
      entry: path.resolve("./resources/notionLambda.js"),
      handler: "handler",
    });

    secret.grantRead(notionLambda.role);
  }
}

module.exports = { NotionLambdaStack };
