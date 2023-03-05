import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as express from "express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

interface User {
  id: string;
  name: string;
}

const userList: User[] = [
  {
    id: "1",
    name: "KATT",
  },
];

const appRouter = t.router({
  getUser: t.procedure
    // The input is unknown at this time.
    // A client could have sent us anything
    // so we won't assume a certain data type.
    .input((val: unknown) => {
      // If the value is of type string, return it.
      // TypeScript now knows that this value is a string.
      if (typeof val === "string") return val;

      // Uh oh, looks like that input wasn't a string.
      // We will throw an error instead of running the procedure.
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;

      const user = userList.find((u) => u.id === input);

      return user;
    }),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
console.log("Server listening on port 4000! :rocket:");
app.listen(4000);
