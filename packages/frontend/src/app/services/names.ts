import type { AppRouter } from "../../../../server/server";
import { createApi, BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { createTRPCProxyClient, httpLink } from "@trpc/client";

type RootState = {
  apiUrls: {
    apiUrls: {
      TRPC_API_URL: string;
    };
  };
};

const getTRPCClient = (queryApi: BaseQueryApi) => {
  const state = queryApi.getState() as RootState;
  const trpcBaseUrl = state.apiUrls.apiUrls.TRPC_API_URL;
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpLink({
        url: trpcBaseUrl,
      }),
    ],
  });
};
type Router = ReturnType<typeof getTRPCClient>;

const baseQueryFn = (trpcResult: Promise<unknown>) =>
  trpcResult.then((data) => ({ data })).catch((error) => ({ error }));

export const nameApi = createApi({
  reducerPath: "nameApi",
  baseQuery: baseQueryFn,
  endpoints: (builder) => ({
    getFunName: builder.query<
      Awaited<ReturnType<Router["getFunName"]["mutate"]>>,
      Parameters<Router["getFunName"]["mutate"]>[0]
    >({
      queryFn: async (arg, queryApi) => {
        const client = getTRPCClient(queryApi);
        const result = await client.getFunName.mutate(arg);
        return { data: result };
      },
    }),
    getSuperFunName: builder.query<
      Awaited<ReturnType<Router["getSuperFunName"]["mutate"]>>,
      Parameters<Router["getSuperFunName"]["mutate"]>[0]
    >({
      queryFn: async (arg, queryApi) => {
        const client = getTRPCClient(queryApi);
        const result = await client.getSuperFunName.mutate(arg);
        return { data: result };
      },
    }),
  }),
});

export const { useGetFunNameQuery, useGetSuperFunNameQuery } = nameApi;
