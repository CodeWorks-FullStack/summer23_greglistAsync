import { baseURL } from '../env.js';
import { logger } from '../utils/Logger.js';

// NOTE default axios instance. Used in other parts of our application, so renaming can break things. Create a new instance of axios if you need to talk to a different api
// @ts-ignore
// eslint-disable-next-line no-undef
export const api = axios.create({
  // NOTE brought in from our env.js
  baseURL: baseURL,
  timeout: 8000,
  withCredentials: true
})



// REVIEW black magic do not touch
api.interceptors.request.use(config => config, handleAxiosError)
api.interceptors.response.use(response => response, handleAxiosError)

function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.warn('[📡 AXIOS_ERROR_RESPONSE_DATA]', error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    logger.warn('[📡 AXIOS_ERROR_NO_RESPONSE]', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.warn('[📡 AXIOS_ERROR_INVALID_REQUEST]', error.message)
  }
  return Promise.reject(error)
}