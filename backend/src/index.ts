import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routes from './module';
import * as secretStore from './utils/secret_manager';
import {connectToMongodb} from './config/mongodb';
import bodyParser from 'body-parser';
import {connectToCloudinary} from './config/cloudinary';
import fileUpload from 'express-fileupload';
import cors from 'cors';

async function app() {
  const server = express();
  await secretStore.syncSecret();
  await connectToMongodb();
  await connectToCloudinary();

  server.use(cors());
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(bodyParser.json({limit: '10mb'}));
  server.use(fileUpload());

  server.use('/api', routes);
  server.use('/health', (req: Request, res: Response) => {
    return res.send('#OK');
  });

  const port = process.env.SERVER_PORT || 8080;
  server.listen(port, () => {
    console.log(`server started ${port}`);
  });
}
app();
