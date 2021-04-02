import { env } from './env';
import { makeApp } from './app';

import { Application } from 'express';

makeApp()
	.then(
		(app: Application) =>
			app.listen(
				env.PORT,
				() => {
					console.log('connected to MongoDB');
					console.log(`${env.NODE_ENV} server listening on port ${env.PORT}`);
				}
			)
	)
	.catch(
		(error: any) => {
			console.log(`(index.ts) error: ${error}`);
		}
	);
