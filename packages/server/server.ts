import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { funNameGenerator } from "./utils";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

type FunName = {
  originalName: string;
  funName: string;
};

type SuperFunName = {
  originalName: string;
  superFunName: string;
};

const appRouter = t.router({
  getFunName: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const funName = funNameGenerator(req.input.name);
      const result: FunName = {
        originalName: req.input.name,
        funName,
      };
      return result;
    }),
  getSuperFunName: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation((req) => {
      const funName = funNameGenerator(req.input.name);
      const superFunName = funNameGenerator(funName);
      const result: SuperFunName = {
        originalName: req.input.name,
        superFunName: superFunName,
      };
      return result;
    }),
});

export type AppRouter = typeof appRouter;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();
app.use(cors(corsOptions)).use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
console.log("Server listening on port 4000! :rocket:");
app.listen(4000);
