import axios from "axios";

const defaultHeaders = () => ({

})

/**
 * Type for sending data in Body
 */
export interface RequestData {
  data: object
}

/**
 * Type for sending data as url parameter
 */
export interface RequestParameters {
  params: object
}

type HttpMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

type Payload = RequestData | RequestParameters | void

export const fetchData = (method: HttpMethod) => (path: String) => (payload?: Payload, header?: object | null) => axios({
  method,
  url: `${path}`,
  headers: {...defaultHeaders(), ...header},
  ...payload
});
export const fetchGet = fetchData("GET");
