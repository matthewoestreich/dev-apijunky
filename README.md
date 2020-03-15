<p align="center">
  <a href="https://dev.apijunky.com/docs">https://dev.apijunky.com/docs</a>
</p>

<p align="center">
  <a href="https://nodejs.org/en/">
    <img src="/docs/github/svg/node.svg" alt="Image" width="50">
  </a>
  <a href="https://expressjs.com/">
    <img src="/docs/github/svg/express.svg" alt="Image" width="75" height="40">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="/docs/github/svg/typescript.svg" alt="Image" width="55">
  </a>
  <a href="https://www.postgresql.org/">
    <img src="/docs/github/svg/postgres.svg" alt="Image" width="55">
  </a>
  <a href="https://mochajs.org/">
    <img src="/docs/github/svg/mocha.svg" alt="Image" width="50">
  </a>
  <a href="https://www.chaijs.com/">
    <img src="/docs/github/svg/chai.svg" alt="Image" width="50">
  </a>
  <a href="https://eslint.org/">
    <img src="/docs/github/svg/eslint.svg" alt="Image" width="61">
  </a>
  <a href="https://prettier.io/">
    <img src="/docs/github/svg/prettier.svg" alt="Image" width="52">
  </a>
  <a href="https://nodemon.io/">
    <img src="/docs/github/svg/nodemon.svg" alt="Image" width="48">
  </a>
  <a href="https://istanbul.js.org/">
    <img src="/docs/github/svg/istanbul.svg" alt="Image" width="53">
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.org/oze4/dev-apijunky"><img title="Build Status" src="https://travis-ci.org/oze4/dev-apijunky.svg?branch=master" ></a>
  <a href="https://coveralls.io/github/oze4/dev-apijunky?branch=master"><img title="Coverage Status" src="https://coveralls.io/repos/github/oze4/dev-apijunky/badge.svg?branch=master" ></a>
  <a href="https://snyk.io/test/github/oze4/dev-apijunky?targetFile=package.json"><img src="https://snyk.io/test/github/oze4/dev-apijunky/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/oze4/dev-apijunky?targetFile=package.json" style="max-width:100%;"></a>
</p>

---

<br/>

# Table of Contents 

 - [Default Configuration](#default-configuration)

<br/>

# Default Configuration

We parse environmental variables into an [configuration object](https://github.com/oze4/dev-apijunky/blob/master/src/configuration.ts), then use that configuration object throughout the application instead of `process.env.X`.  This is done to mitigate the possibility of undefined `process.env` variables.

The only variables which we do not supply a default value for are `process.env.JWT_ENCRYPTION_KEY` and `process.env.JWT_SIGNING_KEY`. If these values are `undefined`, we throw an error [during configuration init](https://github.com/oze4/dev-apijunky/blob/master/src/index.ts#L24).

 :exclamation: <b>If you add or remove any `.env` variables, make sure you update the `configuration.ts` file!!</b> :exclamation: 

| Environmental Variable | Default Value | Notes |
| --- | --- | --- |
| `process.env.NODE_ENV` | development ||
| `process.env.HOST_PORT` | 3000 | The port that Express will listen on |
| `process.env.DB_HOST` | localhost | Host which contains your postgres database |
| `process.env.DB_PORT` | 5432 | We use postgres |
| `process.env.DB_USERNAME` | apijunky | <ul><li>Default database username</li><li>***We do not add/change any account, we simply attempt to login with this username***</li></ul> |
| `process.env.DB_PASSWORD` | @piJunky123 | <ul><li>Default database password</li><li>***We do not create or modify any account, we simply attempt to login with this password***</li></ul> |
| `process.env.DB_DATABASE` | devapijunky | <ul><li>Default database</li><li>***We do not attempt to create any database, we simply attempt to login to this database***</li></ul> |
| `process.env.JWT_EXPIRES_IN` | "10 minutes" | <ul><li>In [ms.js](https://github.com/zeit/ms) notation</li><li>If the value contains a space, it must be surrounded in double quotes (within your `.env` file)</li><li>If you are using Heroku, or something like it, you do not have to use double quotes ***within their online portal***</li></ul> |
| :rotating_light:`process.env.JWT_ENCRYPTION_KEY` | `undefined` | **Will throw an error if `undefined`** |
| :rotating_light:`process.env.JWT_SIGNING_KEY` | `undefined` | **Will throw an error if `undefined`**  |

<br/>

---

<p align="center">
  <small>
    Hiring? Give me a shout <a href="https://mattoestreich.com">https://mattoestreich.com</a>
  </small>
</p>

---