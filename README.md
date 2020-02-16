<p align="center">
  <a href="https://dev.apijunky.com/docs">https://dev.apijunky.com/docs</a>
<p align="center">TypeScript | Express | Mocha | Chai | NYC & Istanbul | Prettier | ESLint | apiDoc</p>

<p align="center">
  <a href="https://travis-ci.org/oze4/dev-apijunky"><img title="Build Status" src="https://travis-ci.org/oze4/dev-apijunky.svg?branch=master" ></a>
  <a href="https://coveralls.io/github/oze4/dev-apijunky?branch=master"><img title="Coverage Status" src="https://coveralls.io/repos/github/oze4/dev-apijunky/badge.svg?branch=master" ></a>  
</p>

---

# Default Configuration

We parse environmental variables into an [configuration object](https://github.com/oze4/dev-apijunky/blob/master/src/configuration.ts), then use that configuration object throughout the application instead of `process.env.X`.  This is done to mitigate the possibility of undefined `process.env` variables.

The only variables which we do not supply values for are `process.env.JWT_ENCRYPTION_KEY` and `process.env.JWT_SIGNING_KEY`. If these values are `undefined`, we throw an error [during configuration init](https://github.com/oze4/dev-apijunky/blob/master/src/index.ts#L24).

| Environmental Variable           | Default Value <br /> <small>(as `string`)</small> | Notes                                           |
| -------------------------------- | -------------------------- | ----------------------------------------------- |
| `process.env.NODE_ENV`           | development                 |                                                 |
| `process.env.HOST_PORT`          | 3000                        |                                                 |
| `process.env.DB_HOST`            | localhost                   |                                                 |
| `process.env.DB_PORT`            | 5432                        |                                                 |
| `process.env.DB_USERNAME`        | admin                       |                                                 |
| `process.env.DB_PASSWORD`        | admin                       |                                                 |
| `process.env.DB_DATABASE`        | test                        |                                                 |
| `process.env.JWT_EXPIRES_IN`     | "10 minutes"                | - In [ms.js](https://github.com/zeit/ms) notation <br/> - If the value contains a space, it must be surrounded in double quotes (within your `.env` file) |
| `process.env.JWT_ENCRYPTION_KEY` |                             | **Will throw an error if `undefined`**          |
| `process.env.JWT_SIGNING_KEY`    |                             | **Will throw an error if `undefined`**          |
