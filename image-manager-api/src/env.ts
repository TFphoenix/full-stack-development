require('dotenv').config();
console.log(require('dotenv').config());

const ENV_TOKEN_SECRET = process.env.ENV_TOKEN_SECRET;

export const env = Object.freeze(
  {
    PORT: 8080,
    NODE_ENV: 'development',
    TOKEN_SECRET: ENV_TOKEN_SECRET,
  }
);