require('dotenv').config();
console.log(require('dotenv').config());

const CLUSTER_URI = process.env.ENV_MONGO_URI;

export const env = Object.freeze(
	{
		PORT: process.env.PORT || 8080,

		NODE_ENV: 'development',

		MONGO_URL: CLUSTER_URI,
		DB_NAME: 'ImageManagerDb',

		USERS_ROUTE: '/db/users',

		REGISTER_ROUTE: '/api/register',
		LOGIN_ROUTE: '/api/login'
	}
);
