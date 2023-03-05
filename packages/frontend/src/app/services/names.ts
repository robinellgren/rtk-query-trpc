import type { AppRouter } from "../../../../server/server";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";
import { createApi, BaseQueryApi } from "@reduxjs/toolkit/query/react";
import { createTRPCProxyClient, httpLink } from "@trpc/client";

type GetFunNameResult = inferProcedureOutput<AppRouter["getFunName"]>;
type GetFunNameInput = inferProcedureInput<AppRouter["getFunName"]>;
type GetSuperFunNameResult = inferProcedureOutput<AppRouter["getSuperFunName"]>;
type GetSuperFunNameInput = inferProcedureInput<AppRouter["getSuperFunName"]>;

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

export const nameApi = createApi({
  reducerPath: "nameApi",
  baseQuery: (trpcResult: Promise<unknown>) =>
    trpcResult.then((data) => ({ data })).catch((error) => ({ error })),
  endpoints: (builder) => ({
    getFunName: builder.query<GetFunNameResult, GetFunNameInput>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const client = getTRPCClient(queryApi);
        const result = await client.getFunName.mutate(arg);
        return { data: result };
      },
    }),
    getSuperFunName: builder.query<GetSuperFunNameResult, GetSuperFunNameInput>(
      {
        queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
          const client = getTRPCClient(queryApi);
          const result = await client.getSuperFunName.mutate(arg);
          return { data: result };
        },
      }
    ),
  }),
});

export const { useGetFunNameQuery, useGetSuperFunNameQuery } = nameApi;
