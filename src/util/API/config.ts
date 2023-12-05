import axios from 'axios';
import type { AxiosRequestHeaders, AxiosRequestConfig, AxiosInstance } from 'axios';

class AxiosConfig {
    private _baseUrl = 'http://legion-tracker-api.telkom.design/api/v1/';
    private _headerConfigs?: AxiosRequestHeaders = {};
    private _configs: AxiosRequestConfig = {
      baseURL: this._baseUrl,
      timeout: 60000,
      headers: this._headerConfigs
    };
    private _instance?: AxiosInstance;
  
    public get axiosInstance() {
      return this._instance;
    }
  
    constructor(baseUrl: string, headers?: AxiosRequestHeaders) {
        // set class baseUrl to the initializing parameters
        this._baseUrl = baseUrl;
      
        // if headers are passed, then add it to the the existing config
        if (headers) {
          this._headerConfigs = Object.assign({}, this._headerConfigs, headers);
        }
      
        // create a new axios instance and assign to property
        this._instance = axios.create(this._configs);
      
        // intercept the request and run any actions
        // request will not run if this fails
        this._instance?.interceptors.request.use(
          (config) => {
            return config;
          }.
          (error) => {
            return Promise.reject(error);
          }
        );
      
        // intercept the response and handle the data
        // the question mark syntax here is an optional chaining technique
        this._instance?.interceptors.response.use(
          (response) => {
            return response;
          }.
          (error) => {
            return Promise.reject(error);
          }
        );
      }
  }
  
  export default AxiosConfig;