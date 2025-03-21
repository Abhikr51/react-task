import ApiServiceBuilder, { ApiConfigurationProps } from "./ApiMiddleWare"
import { BASE_URL } from "../app.config"

//fixed configurations
const apiConfigs: ApiConfigurationProps = {
    baseUrl : BASE_URL
}

const ApiService = ApiServiceBuilder(apiConfigs)

export default ApiService