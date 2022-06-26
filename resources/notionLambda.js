const AWS = require("aws-sdk");
// const { Client } = require("@notionhq/client");

exports.handler = async (/** @type {any} */ event) => {
  console.log("It worked!");
  console.log("Event: ", JSON.stringify(event, undefined, 2));
  const secretsManager = new AWS.SecretsManager();
  const NOTION_TOKEN = await secretsManager.getSecretValue({ SecretId: "notionKey" }).promise();
  console.log(NOTION_TOKEN);

  // const notion = new Client({
  //   auth: process.env.NOTION_TOKEN,
  // });
};
