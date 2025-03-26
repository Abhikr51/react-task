import ApiMiddleware  from "./ApiMiddleware";
import { BASE_URL } from "../app.config";
import { DefaultsApiConfigs } from "./ApiMiddleware/types";

// Define default configurations

//setup env files
const apiInitializer = ()=>{
  const defaultApiConfig: DefaultsApiConfigs = {
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer YOUR_TOKEN_HERE",
    },
  };
  
  // Apply default configurations to the API middleware
  ApiMiddleware.setDefaultConfig(defaultApiConfig);
}

export default apiInitializer