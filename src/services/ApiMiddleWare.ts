import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from "axios"
import { useState } from "react"

export type ApiConfigurationProps = {
    baseUrl:string,
}
export interface RequestConfigs extends Partial<ApiConfigurationProps> {
    
} 
export const CreateApiService = (apiConfigs?:ApiConfigurationProps)=>{
    const axiosInstance = axios.create({
        baseURL: apiConfigs?.baseUrl
    })

    axiosInstance.interceptors.request.use( request => {
        return request
    })
    axiosInstance.interceptors.response.use( response => {
        return response
    })
    return axiosInstance
}




const ApiServiceBuilder = (configurations:ApiConfigurationProps)=>{
    const ApiInstance = (reqConfigs?: RequestConfigs) => {
        return CreateApiService({...configurations,...reqConfigs})
    }
    
    
    const useApiCall = (fetcher:any = ()=>{} , ...params:any)=>{
        const [loading, setLoading] = useState<boolean>(true)
        const [error, setError] = useState("")
        const [errorObject, setErrorObject] = useState(null)
        const [response, setResponse] = useState<any>(null)
        const fetchData = async () => {
            try {
                setLoading(true);
                const res: any = await fetcher(...params)
                setResponse(res.data);
            } catch (err: any) {
                setError(err?.message || "An unknown error occurred");
                setErrorObject(err);
            } finally {
                setLoading(false);
            }
        };
        return {
            response,    // The response data from the API
            loading,     // The loading state (true when the API request is in progress)
            error,       // Error message if the API request fails
            fetchData,     // Function to manually trigger the API request
            errorObject, // The full error object (useful for debugging)
        };
    }
    
    const usePost = (endpoint: string, data?: any, combinedConfigs?: {axiosConfig? :AxiosRequestConfig , requestConfig? : RequestConfigs}) => {
        return useApiCall(ApiInstance(combinedConfigs?.requestConfig).post , endpoint, data, combinedConfigs?.axiosConfig)
    }
    const useGet =(endpoint: string, combinedConfigs?: {axiosConfig? :AxiosRequestConfig , requestConfig? : RequestConfigs}) => {
        return useApiCall(ApiInstance(combinedConfigs?.requestConfig).get , endpoint, combinedConfigs?.axiosConfig)
    }
    const usePut = (endpoint: string, data?: any, combinedConfigs?: {axiosConfig? :AxiosRequestConfig , requestConfig? : RequestConfigs}) => {
        return useApiCall(ApiInstance(combinedConfigs?.requestConfig).put , endpoint, data,combinedConfigs?.axiosConfig)
    }
    const useDelete = (endpoint: string, combinedConfigs?: {axiosConfig? :AxiosRequestConfig , requestConfig? : RequestConfigs}) => {
        return useApiCall(ApiInstance(combinedConfigs?.requestConfig).delete , endpoint, combinedConfigs?.axiosConfig)
    }
    const usePatch = (endpoint: string,  data?: any,combinedConfigs?: {axiosConfig? :AxiosRequestConfig , requestConfig? : RequestConfigs}) => {
        return useApiCall(ApiInstance(combinedConfigs?.requestConfig).patch , endpoint, data,combinedConfigs?.axiosConfig)
    }
    const useOptions = (endpoint: string, combinedConfigs?: {axiosConfig? :AxiosRequestConfig , requestConfig? : RequestConfigs}) => {
        return useApiCall(ApiInstance(combinedConfigs?.requestConfig).options , endpoint, combinedConfigs?.axiosConfig)
    }
    return {
        usePost,
        useGet,
        usePut,
        useDelete,
        usePatch,
        useOptions,
    }
    
}


export default ApiServiceBuilder