


  const dev = {
    apiGateway: {
      URL: "http://127.0.0.1:5000"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_IAxfZWin1",
      APP_CLIENT_ID: "7d7tlebf188i34520u40o12lhu",
      IDENTITY_POOL_ID: "us-east-2:8282ea73-1afb-4ab0-89e1-5d3da4ac214f"
    }
  };
  
  const prod = {
    apiGateway: {
      URL: "ProjectA-env-3.pxmqbpnmph.us-east-2.elasticbeanstalk.com"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_IAxfZWin1",
      APP_CLIENT_ID: "7d7tlebf188i34520u40o12lhu",
      IDENTITY_POOL_ID: "us-east-2:8282ea73-1afb-4ab0-89e1-5d3da4ac214f"
    }
  };
  
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };