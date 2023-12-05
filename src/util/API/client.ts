export class HttpClient {
    private static async request<ResponseType = any, RequestType = any>(
      method: HttpMethods,
      endpoint: string,
      request?: ApiRequest<RequestType>
    ) {
      return await axios.axiosInstance?.({
        method,
        url: endpoint,
        data: request?.body
      }).then(({ data }) => {
        return data as ResponseType;
      });
    }
  
    public static get<ResponseType>(
      endpoint: string, 
      query?: Record<string, React.ReactText>
    ) {
      return this.request<ResponseType>(HttpMethods.Get, endpoint, { query });
    }
  
    public static post<RequestType, ResponseType = unknown>(
      endpoint: string,
      body?: RequestType
    ) {
      return this.request<ResponseType>(HttpMethods.Post, endpoint, { body });
    }
  }
  