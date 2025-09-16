import axios, { AxiosError, AxiosRequestConfig } from "axios";

export type ApiResult<T> = Promise<T>;

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8000/backend",
  withCredentials: true,
});

// skip AdminGuard on server side
axiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};

  if (!("x-admin" in config.headers)) {
    (config.headers as any)["x-admin"] = "true";
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (r) => r,
  (e: AxiosError) => Promise.reject(e.response ?? e)
);

export async function createInstance<T = any>(
  config: AxiosRequestConfig
): ApiResult<T> {
  const res = await axiosInstance.request<T>(config);

  return res.data as T;
}
