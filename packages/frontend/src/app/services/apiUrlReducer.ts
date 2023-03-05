export type ApiUrlsState = {
  apiUrls: {
    TRPC_API_URL: string;
  };
};

const preloadedState = {
  apiUrls: {
    TRPC_API_URL: "http://localhost:4000/trpc",
  },
};

export const apiUrlReducer = (
  state: ApiUrlsState = preloadedState
): ApiUrlsState => state;
