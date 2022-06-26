#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { NotionLambdaStack } = require('../lib/notion-lambda-stack');

const app = new cdk.App();
new NotionLambdaStack(app, 'NotionLambdaStack');
