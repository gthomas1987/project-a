


  const dev = {
    apiGateway: {
      URL: "http://127.0.0.1:5000"
    },
    cognito: {
      REGION: "ap-southeast-1",
      USER_POOL_ID: "ap-southeast-1_wNiJLRUMY",
      APP_CLIENT_ID: "2jas8iv9bsh1fte9ljgshi5d20",
      IDENTITY_POOL_ID: "ap-southeast-1:a8fd1e6f-bdca-45cd-aa6f-36c2a0114eb5"
    }
  };
  
  const prod = {
    apiGateway: {
      URL: "https://server.gtalgos.com"
    },
    cognito: {
      REGION: "ap-southeast-1",
      USER_POOL_ID: "ap-southeast-1_wNiJLRUMY",
      APP_CLIENT_ID: "2jas8iv9bsh1fte9ljgshi5d20",
      IDENTITY_POOL_ID: "ap-southeast-1:a8fd1e6f-bdca-45cd-aa6f-36c2a0114eb5"
    }
  };
  
  const config = process.env.REACT_APP_STAGE === 'dev'
    ? dev
    : prod;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };