import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { tagTypesList } from "../interface/tag-types";

// const BaseURl = "http://10.10.10.110:3000";
const BaseURl = "http://72.244.153.25:3000";

interface BaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

// Type for the args that will be passed to axios (base query arguments)

const baseQueryWithRath: BaseQueryFn<BaseQueryArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  try {
    const token = await AsyncStorage.getItem("token");
    // console.log(args?.headers);

    // console.log(token, "token from base url............");

    const result: AxiosResponse = await axios({
      baseURL: BaseURl + "/api/v1",
      ...args,
      url: args.url,
      method: args.method,
      data: args.body,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        ...args.headers,
      },
    });

    // console.log(result?.headers);
    // Check if response data is a string and malformed

    // console.log(result.request, "result from base url");

    // if (result?.status === 403) {
    //   AsyncStorage.removeItem("token");
    //   AsyncStorage.removeItem("user");
    // }

    // if (result?.status === 401) {
    //   AsyncStorage.removeItem("token");
    //   AsyncStorage.removeItem("user");
    // }

    return { data: result?.data };
  } catch (error: any) {
    return {
      error: error?.response?.data,
    };
  }
};

// Define the `createApi` with appropriate types
export const api = createApi({
  keepUnusedDataFor: 0,
  reducerPath: "api",
  baseQuery: baseQueryWithRath,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

// export const imageUrl = 'http://192.168.12.160:7000/';
// export const imageUrl = "http://103.186.20.114:8050";

export const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const base = BaseURl!.replace(/\/+$/, "");
  const path = url.replace(/^\/+/, "");
  return `${base}/${path}`;
};

export const getMedia = (url: string) => {
  return `${BaseURl}${url}`;
};
