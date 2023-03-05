import type { AppRouter } from "../../../../server/server";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createTRPCProxyClient, httpLink } from "@trpc/client";

type GetFunNameResult = inferProcedureOutput<AppRouter["getFunName"]>;
type GetFunNameInput = inferProcedureInput<AppRouter["getFunName"]>;
type GetSuperFunNameResult = inferProcedureOutput<AppRouter["getSuperFunName"]>;
type GetSuperFunNameInput = inferProcedureInput<AppRouter["getSuperFunName"]>;
const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});

export const nameApi = createApi({
  reducerPath: "nameApi",
  baseQuery: (trpcResult: Promise<unknown>) =>
    trpcResult.then((data) => ({ data })).catch((error) => ({ error })),
  endpoints: (builder) => ({
    getFunName: builder.query<GetFunNameResult, GetFunNameInput>({
      query: trpcClient.getFunName.mutate,
    }),
    getSuperFunName: builder.query<GetSuperFunNameResult, GetSuperFunNameInput>(
      {
        query: trpcClient.getSuperFunName.mutate,
      }
    ),
  }),
});

export const { useGetFunNameQuery, useGetSuperFunNameQuery } = nameApi;
