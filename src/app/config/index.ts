export const API_BASE_URL = getEnvVar('VITE_APP_API_BASE_URL');
export const API_PROTOCOL = getEnvVar('VITE_APP_API_PROTOCOL');
export const APP_SERVICE_URL = getEnvVar('VITE_APP_API_SERVICE_URL');
export const API_PORT = getEnvVar('VITE_APP_API_PORT');

function getEnvVar(key: string) {
    const envVar = import.meta.env[key]
    if (envVar === undefined) {
      throw new Error(`Env variable ${key} is required`)
    }
    return envVar
  }