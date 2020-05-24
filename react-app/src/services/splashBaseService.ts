import {fetchGet} from "./fetch";
import {AxiosResponse} from "axios";
import {all} from "ramda";

export interface SplashBaseResponseImageEntry {
  id: number,
  url: string,
  large_url?: string,
  source_id?: number,
  copyright?: string,
  site?: string
}

export interface SplashBaseResponse {
  images: Array<SplashBaseResponseImageEntry>
}

/**
 * Service for fetching images from www.splashbase.co.
 *
 * @param {string} query - query for image to be found by
 * @returns {Promise<AxiosResponse<SplashBaseResponseImageEntry>>} - response images
 */
export const getSplashBaseImagesByQuery = async (query: string) : Promise<AxiosResponse<SplashBaseResponse>> => {
  const isSplashBaseResponse = (response: SplashBaseResponse): response is SplashBaseResponse =>
    all(imageResponse =>
      Boolean(imageResponse.id && imageResponse.url),
    response.images)

  const result = await fetchGet("http://www.splashbase.co/api/v1/images/search")({params: {query}});
  if (isSplashBaseResponse(result.data)){
    return result;
  }

  console.error("splashBaseService returned unknown return type")
  return {...result, data: {images: []}}
}

/**
 * Service for fetching a specific image from www.splashbase.co.
 *
 * @param {string} id - id for image to open
 * @returns {Promise<AxiosResponse<SplashBaseResponseImageEntry>>} - response images
 */
export const getSplashBaseImagesById = async (id: string) : Promise<AxiosResponse<SplashBaseResponseImageEntry>> => {
  const isSplashBaseResponseImageEntry = (response: SplashBaseResponseImageEntry): response is SplashBaseResponseImageEntry =>
    Boolean(response.id && response.copyright && response.url);

  const result = await fetchGet(`http://www.splashbase.co/api/v1/images/${id}`)();
  if (isSplashBaseResponseImageEntry(result.data)){
    return result;
  }

  console.error("splashBaseService returned unknown return type")
  return {...result, data: {id: 0, url: "unknown", copyright: "unknown"}}
}

/**
 * Service for fetching a 10 latest images from www.splashbase.co.
 *
 * @returns {Promise<AxiosResponse<SplashBaseResponseImageEntry>>} - response images
 */
export const getSplashBaseLatestImages = async () : Promise<AxiosResponse<SplashBaseResponse>> => {
  const isSplashBaseResponse = (response: SplashBaseResponse): response is SplashBaseResponse =>
    all(imageResponse =>
      Boolean(imageResponse.id && imageResponse.url),
    response.images)

  const result = await fetchGet("http://www.splashbase.co/api/v1/images/latest")();
  if (isSplashBaseResponse(result.data)){
    return result;
  }

  console.error("splashBaseService returned unknown return type")
  return {...result, data: {images: []}}
}