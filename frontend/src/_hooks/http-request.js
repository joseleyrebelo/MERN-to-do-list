import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const sortFetchParams = (method, body, headers) => {
    return method == "GET"
      ? {
          method,
          headers,
        }
      : {
          method,
          body,
          headers,
        };
  };

  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    try {
      const fetchParams = sortFetchParams(method, body, headers);

      const response = await fetch(url, fetchParams);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return { success: true, data: responseData };
    } catch (error) {
      return { success: false, data: error };
    }
  };

  return { sendRequest };
};
