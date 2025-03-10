import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import logger from 'morgan';

import { checkAuth, errorHandler } from '@/app/middlewares/handlers';
import { envMode } from '@/config';
import { AuthRouter, BaseRouter } from '@/routes';

// calling db
import './config/db-connection';

const app = express();
const logMode = envMode === 'prod' ? 'combined' : 'dev';

// ** helpers middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(logger(logMode));

// ** all routes gathers here...
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1', checkAuth, BaseRouter);

// ** Alway keep on the end
app.use(errorHandler);

export default app;
