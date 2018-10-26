import { APIGatewayProxyHandler } from 'aws-lambda';

const handler: APIGatewayProxyHandler = async (event) => {
  return {
    body: JSON.stringify({
      input: event,
      message:
        'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
    }),
    statusCode: 200,
  };
};

export default handler;
