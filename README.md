# RTK Query + tRPC

This repository showcases how to combine `RTK Query` with `tRPC` when storing the `tRPC url` inside the `store`.

## Getting started

- `npm i -w server`
- `npm run start -w server`
- `npm i -w frontend`
- `npm run start -w frontend`

## Files of interest:

- `packages/frontend/app/services/names.ts` The API definition of the `tRPC API`
- `packages/frontend/app/store.ts` The combining of the API:s using `RTK Query`
- `packages/server/server.ts` The `tRPC backend implementation`